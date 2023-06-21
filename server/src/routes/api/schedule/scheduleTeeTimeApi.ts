import {FastifyInstance} from 'fastify';
import {Static, Type} from '@sinclair/typebox';
import {DateTime} from 'luxon';
import {Job} from 'agenda';
import {ChronogolfBookJob} from 'src/plugins/chronogolf/chronogolfBookJob';
import {
  ScheduleDetails,
  ScheduleDetailsType,
} from 'src/schema/schedule/scheduleDetails';
import {User, UserSchema} from 'src/schema/user';
import {Aggregate, AggregateSchema} from 'src/schema/aggregate';

export default async function scheduleTeeTimeApi(fastify: FastifyInstance) {
  const ResponseType = Type.Object({
    message: Type.String(),
  });

  type Response = Static<typeof ResponseType>;

  fastify.post<{Body: ScheduleDetails; Reply: Response}>(
    '/scheduleTeeTime',
    {
      schema: {
        body: ScheduleDetailsType,
        response: {
          200: ResponseType,
        },
      },
      preValidation: (req, reply) =>
        fastify.authorize(req, reply, ['execute:scheduleTeeTime']),
    },
    async (req, reply) => {
      const scheduleDetails: ScheduleDetails = req.body;

      // Find the user from the database with the provided ID
      const user: User = await fastify
        .databaseAccess(new UserSchema())
        .get(fastify, scheduleDetails.userId);

      if (user === null) {
        reply.status(400);
        reply.send({
          message: `Unable to find user with ID ${scheduleDetails.userId}`,
        });
        return;
      }

      // Find the aggregate from the database with the provided ID
      const aggregate: Aggregate = await fastify
        .databaseAccess(new AggregateSchema())
        .get(fastify, scheduleDetails.aggregateId);

      if (aggregate === null) {
        reply.status(400);
        reply.send({
          message: `Unable to find aggregate with ID ${scheduleDetails.aggregateId}`,
        });
        return;
      }

      // Generate a unique taskId for the agenda job
      const taskId = `${scheduleDetails.userId};${scheduleDetails.courseId};${scheduleDetails.teeTimeDate}`;
      const agenda = fastify.agenda;

      // Look for existing jobs with that same ID
      const jobs = await agenda.jobs({
        name: taskId,
        nextRunAt: {$ne: null},
      });

      // If a job already exists, we need to exit to eliminate duplicate jobs
      if (jobs !== null && jobs.length !== 0) {
        reply.status(400);
        reply.send({
          message: 'Found duplicate tee time scheduling identifier',
        });
        return;
      }

      // Create a new job for a chronogolf booking
      const chronogolfJob = new ChronogolfBookJob();

      // Define the job to be executed
      agenda.define(taskId, (job: Job, done) => {
        chronogolfJob.execute(fastify, job, done);
      });

      const now = DateTime.now();
      const teeTimeDate = DateTime.fromISO(scheduleDetails.teeTimeDate);

      const scheduleCutOff = teeTimeDate.minus({
        minutes: aggregate.minuteScheduleOffset,
      });

      // If we are ahead of the cut off date for scheduling, schedule for the future
      if (scheduleCutOff > now) {
        console.log(`Scheduling job: ${taskId}`);

        agenda.schedule(
          scheduleCutOff.toJSDate(),
          taskId,
          chronogolfJob.toData(scheduleDetails)
        );

        reply.send({
          message: `Tee time has been scheduled to book at ${scheduleCutOff.toISO()}`,
        });
      } else {
        // Otherwise if it is before the cut off, execute immediately
        console.log(`Executing job immediately: ${taskId}`);
        agenda.now(taskId, chronogolfJob.toData(scheduleDetails));

        reply.send({message: 'Tee time booked immediately.'});
      }
    }
  );
}
