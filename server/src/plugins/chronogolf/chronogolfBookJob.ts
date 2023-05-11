import {Job, JobAttributesData} from 'agenda';
import {FastifyInstance} from 'fastify';
import {ScheduleDetails} from 'src/schema/chronogolf/schedule';
import {JobDefinition} from '../agenda';

// Needs to be unique
const CHRONOGOLF_BOOK_JOB_ID = 'bookChronogolf';

export class ChronogolfBookJob implements JobDefinition {
  execute(fastify: FastifyInstance, job: Job, done: () => void): void {
    console.log(`Starting service for task ${job.attrs.name}`);

    const scheduleDetails = job.attrs.data?.details as ScheduleDetails;
    fastify.bookChronogolfTime(scheduleDetails);

    done();
  }

  toData(scheduleDetails: ScheduleDetails): JobAttributesData {
    return {
      type: CHRONOGOLF_BOOK_JOB_ID,
      details: scheduleDetails,
    };
  }
}
