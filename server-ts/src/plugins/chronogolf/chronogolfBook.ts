import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {ScheduleDetails} from 'src/schema/chronogolf/schedule';
import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import {DateTime} from 'luxon';

// Example: 2022-07-08
const URL_DATE_FORMAT = 'yyyy-LL-dd';
// Example: 1:30 PM
const TIME_FORMAT = 't';

declare module 'fastify' {
  interface FastifyInstance {
    bookChronogolfTime: (details: ScheduleDetails) => void;
  }
}

const chronogolfBook: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorate('bookChronogolfTime', (details: ScheduleDetails) =>
    bookTime(fastify, details)
  );
};

/*
Books a tee time on any supported chronogolf site.
Utilizes webdriver/chrome to load an internal browser and acts
upon the rendered DOM from the chronogolf page.
*/
async function bookTime(fastify: FastifyInstance, details: ScheduleDetails) {
  const options = new chrome.Options();

  // Always set to headless
  options.headless();
  options.addArguments('--no-sandbox');

  // Configure the webdriver we will use for running the script
  const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://selenium-hub:4444/wd/hub')
    .setChromeOptions(options)
    .build();

  // Set a pretty big timeout in-case stuff is slow
  driver.manage().setTimeouts({
    implicit: 30000,
  });

  try {
    // Begin by parsing the tee time date
    const dateOfTeeTime = DateTime.fromISO(details.date);

    // Format the date for the URL
    const urlFormattedDate = dateOfTeeTime.toFormat(URL_DATE_FORMAT);

    // Define the base URL with detail data
    let url =
      `https://www.chronogolf.com/club/${details.clubId}` +
      `/widget?medium=widget&source=club#?date=${urlFormattedDate}` +
      `&course_id=${details.courseId}&nb_holes=18&affiliation_type_ids=`;

    // Assign the number of players to URL by the number of player type ID (85113)
    for (let i = 0; i < details.playerCount; i++) {
      if (i !== 0 && i !== details.playerCount) {
        url += ',';
      }
      url += '85113';
    }

    // Load the URL onto the page
    await driver.get(url);

    // Get the cutoff for start and end of acceptable teetimes
    const startDateRange = DateTime.fromISO(details.earliestTime);
    const endDateRange = DateTime.fromISO(details.latestTime);

    // Get the widget on the page that holds the tee times
    const teeTimeWidgetEl = await driver.findElement({
      className: 'widget-teetimes',
    });

    // Init the teeTimeButton to null
    let teeTimeButtonEl = null;

    // Find the inner element that holds the tee times
    const teeTimesEl = await teeTimeWidgetEl.findElements({
      className: 'widget-teetime',
    });

    // Go through all of the tee time elements till we find one we can use
    // based on the provided cutoff values
    for (const teeTimeEl of teeTimesEl) {
      // Get the value for a specific tee time so we can read data from it
      const teeTimeElVal = (
        await teeTimeEl
          .findElement({className: 'widget-teetime-tag'})
          .getAttribute('innerHTML')
      )
        .toString()
        .trim();

      const currTeeTimeTime = DateTime.fromFormat(
        teeTimeElVal,
        TIME_FORMAT
      ).setZone('America/New_York', {keepLocalTime: true});

      const currTeeTimeDate = dateOfTeeTime
        .set({
          hour: currTeeTimeTime.hour,
          minute: currTeeTimeTime.minute,
        })
        .setZone('America/New_York', {keepLocalTime: true});

      // If it is within the range, select the first one and exit
      if (
        currTeeTimeDate >= startDateRange &&
        currTeeTimeDate <= endDateRange
      ) {
        teeTimeButtonEl = await teeTimeEl.findElement({
          className: 'widget-teetime-rate',
        });

        console.log(`Found tee time at: ${teeTimeElVal}`);

        break;
      }
    }

    // If we find one, go ahead and select it. If not, exit
    if (teeTimeButtonEl !== null) {
      await teeTimeButtonEl.click();
    } else {
      console.log('Could not find tee time in range!');
      return;
    }

    // Find the login button and click it
    await driver
      .findElement({className: 'widget-step-confirmation'})
      .findElement({className: 'fl-button'})
      .click();

    // Get the user from storage
    const user = await fastify.getChronogolfUser(details.userId);

    // Insert the stored username and password into the fields
    await driver.findElement({id: 'sessionEmail'}).sendKeys(user.username);
    await driver.findElement({id: 'sessionPassword'}).sendKeys(user.password);

    // Click the login button
    await driver.findElement({xpath: "//input[@type='submit']"}).click();

    // Accept the terms of service so that the checkout button becomes clickable
    await driver
      .findElement({tagName: 'reservation-review-terms'})
      .findElement({xpath: "//input[@type='checkbox']"})
      .click();

    if (details.checkout) {
      console.log('Checking out...');

      // Submit the reservation
      await driver
        .findElement({tagName: 'reservation-review-submit-button'})
        .findElement({xpath: "//button[@type='submit']"})
        .click();

      // Wait for the success element to appear so we know if we have succeeded
      await driver.findElement({className: 'alert-success'});
    } else {
      console.log('Skipping checkout...');
    }
  } catch (err) {
    console.log(err);
  } finally {
    driver.quit();
  }
}

export default fp(chronogolfBook, {
  name: 'chronogolfBook',
  dependencies: ['mongo'],
});
