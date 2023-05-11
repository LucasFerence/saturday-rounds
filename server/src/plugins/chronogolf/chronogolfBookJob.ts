import {Job, JobAttributesData} from 'agenda';
import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {ScheduleDetails} from 'src/schema/chronogolf/schedule';
import {JobDefinition} from '../agenda';

// Needs to be unique
const CHRONOGOLF_BOOK_JOB_ID = 'bookChronogolf';

export class ChronogolfBookJob implements JobDefinition {
  execute(fastify: FastifyInstance, job: Job, done: () => void): void {
    console.log(`Starting service for task ${job.attrs.name}`);

    // TODO: Move bookChronoGolfTime into this class and remove ChronogolfBook.ts all together
    const scheduleDetails = job.attrs.data?.details as ScheduleDetails;
    fastify.bookChronogolfTime(scheduleDetails);

    done();
  }

  // TODO: Make this an interface method and have ScheduleDetails be a type parameter on JobDefinition
  toData(scheduleDetails: ScheduleDetails): JobAttributesData {
    return {
      type: CHRONOGOLF_BOOK_JOB_ID,
      details: scheduleDetails,
    };
  }
}

/*
Associated job to run bookTime
*/
const bookTimeJob: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.jobTypes.set(CHRONOGOLF_BOOK_JOB_ID, new ChronogolfBookJob());
};

export default fp(bookTimeJob, {
  name: CHRONOGOLF_BOOK_JOB_ID,
  dependencies: ['agenda'],
});
