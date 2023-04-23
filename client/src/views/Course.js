import {React, useState, useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import PropTypes from 'prop-types';

import axios from 'axios';
import dayjs from 'dayjs';

import {Button, Select, Title, useMantineTheme, Alert} from '@mantine/core';
import {DatePicker, TimeInput} from '@mantine/dates';
import {useForm} from '@mantine/form';

Course.propTypes = {
  courses: PropTypes.array,
  selectedCourse: PropTypes.string,
  scheduleOffsetDays: PropTypes.number,
  scheduleOffsetHours: PropTypes.number,
};

/**
 * Render a specific course given a club
 * @param {*} props
 * @return {div}
 */
function Course(props) {
  // Load the course, add it to state
  const [course, setCourse] = useState();

  useEffect(() => {
    const selected = props.courses.find((c) => c.id === props.selectedCourse);
    setCourse(selected);
  }, [props.courses, props.selectedCourse]);

  // Initialize the form

  const form = useForm({

    initialValues: {
      numPlayers: '4',
      teeTimeDate: null,
      minTime: null,
      maxTime: null,
    },

    validate: {
      teeTimeDate: (value) =>
        (value == null ? 'Must select tee time date' : null),
      minTime: (value) => (value == null ? 'Must select minimum time' : null),
      maxTime: (value) => (value == null ? 'Must select maxium time' : null),
    },
  });

  const theme = useMantineTheme();

  const today = new Date();
  const isInstantDate = (date) => {
    return dayjs(today)
        .add(props.scheduleOffsetDays, 'days')
        .hour(props.scheduleOffsetHours)
        .toDate().getTime() >= date.getTime() &&
            dayjs(today)
                .subtract(1, 'days')
                .toDate().getTime() < date.getTime();
  };

  // Store the backend resposne on the state
  const [response, setResponse] = useState();
  const {getAccessTokenSilently} = useAuth0();

  return (
    <div>
      {response != null &&
        <Alert
          title={response.isSuccess ? 'Success!' : 'Something went wrong...'}
          color={response.isSuccess ? 'green' : 'red'}
        >
          {response.message}
        </Alert>
      }

      <form onSubmit={form.onSubmit((values) => {
        submitForm(props, values, getAccessTokenSilently, setResponse);
        form.reset();
      })}>
        {course != null && <Title>{course.name}</Title>}

        <div>
          IMPORTANT: Any days highlighted in green
          will be executed upon immediately
        </div>

        <Select
          label="Number of players"
          data={['1', '2', '3', '4']}
          required
          {...form.getInputProps('numPlayers')}
        />

        <DatePicker
          placeholder="Pick Date"
          label="Tee time date"
          required
          minDate={today}
          dayStyle={(date) =>
            isInstantDate(date) ?
              {backgroundColor: theme.colors.green[2], color: theme.white} :
              null
          }
          {...form.getInputProps('teeTimeDate')}
        />

        <TimeInput
          label="Earliest Time"
          format="12"
          required
          {...form.getInputProps('minTime')}
        />

        <TimeInput
          label="Latest Time"
          format="12"
          required
          {...form.getInputProps('maxTime')}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

/**
 * Submits the form to the backend for scheduling
 * @param {*} props
 * @param {*} formValues
 * @param {*} getAccessTokenSilently
 * @param {*} setResponse
 */
async function submitForm(
    props,
    formValues,
    getAccessTokenSilently,
    setResponse) {
  /*
  When the form is submitted, just submit the min/max
  times and date and let the
  server determine if it will be ran immediately or if it will be scheduled
  */

  const numPlayers = parseInt(formValues.numPlayers);
  const teeTimeDate = dayjs(formValues.teeTimeDate);

  // Need to set the earliest/latest time date to teeTimeDate

  const fixTimeOnDate = (dateToFix) => {
    return teeTimeDate
        .hour(dateToFix.hour())
        .minute(dateToFix.minute());
  };

  const minTime = fixTimeOnDate(dayjs(formValues.minTime));
  const maxTime = fixTimeOnDate(dayjs(formValues.maxTime));

  const token = await getAccessTokenSilently();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios.post('scheduleChronogolf', {
    userId: 'lference',
    clubId: props.id,
    courseId: props.selectedCourse,
    date: teeTimeDate.toJSON(),
    playerCount: numPlayers,
    earliestTime: minTime.toJSON(),
    latestTime: maxTime.toJSON(),
    checkout: false,
  }, config)
      .catch((err) => {
        setResponse({
          isSuccess: false,
          message: err.response.data?.message,
        });
      })
      .then((res) => {
        setResponse({
          isSuccess: true,
          message: res.data?.message,
        });
      });
}

export default Course;
