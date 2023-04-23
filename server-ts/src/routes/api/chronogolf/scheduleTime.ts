import {FastifyInstance} from 'fastify';
import {Static, Type} from '@sinclair/typebox';
import {
  ScheduleDetails,
  ScheduleDetailsType,
} from 'src/schema/chronogolf/schedule';
import {DateTime} from 'luxon';
import {Job} from 'agenda';
import {ChronogolfBookJob} from 'src/plugins/chronogolf/chronogolfBookJob';

const ResponseType = Type.Object({
  message: Type.String(),
});

type Response = Static<typeof ResponseType>;

export default async function scheduleTime(server: FastifyInstance) {
  server.post<{Body: ScheduleDetails; Reply: Response}>(
    '/scheduleChronogolf',
    {
      schema: {
        body: ScheduleDetailsType,
        response: {
          200: ResponseType,
        },
      },
      preValidation: (req, reply) =>
        server.authorize(req, reply, ['write:scheduleTime']),
    },
    async (request, reply) => {
      const scheduleDetails: ScheduleDetails = request.body;

      const user = await server.getChronogolfUser(scheduleDetails.userId);
      if (user === null) {
        reply.status(400);
        reply.send({message: 'Invalid user!'});
        return;
      }

      const club = await server.getChronogolfClub(scheduleDetails.clubId);
      if (club === null) {
        reply.status(400);
        reply.send({message: 'Invalid club!'});
        return;
      }

      // Generate a unique taskId for the agenda
      const taskId = `${scheduleDetails.userId};${scheduleDetails.courseId};${scheduleDetails.date}`;
      const agenda = server.agenda;

      const jobs = await agenda.jobs({
        name: taskId,
        nextRunAt: {$ne: null},
      });

      if (jobs !== null && jobs.length !== 0) {
        reply.status(400);
        reply.send({
          message:
            'You already have a tee time on the selected date for that course!',
        });
        return;
      }

      const chronogolfJob = new ChronogolfBookJob();

      agenda.define(taskId, (job: Job, done) => {
        chronogolfJob.execute(server, job, done);
      });

      const now = DateTime.now();
      const teeTimeDate = DateTime.fromISO(scheduleDetails.date);

      const scheduleCutoff = teeTimeDate.minus({
        days: club.scheduleOffsetDays,
        hours: 24 - club.scheduleOffsetHours,
      });

      if (scheduleCutoff > now) {
        console.log(`Scheduling job: ${taskId}`);

        agenda.schedule(
          scheduleCutoff.toJSDate(),
          taskId,
          chronogolfJob.toData(scheduleDetails)
        );

        reply.send({
          message: `Tee time has been scheduled to book at ${scheduleCutoff.toISO()}`,
        });
      } else {
        console.log(`Executing job immediately: ${taskId}`);
        agenda.now(taskId, chronogolfJob.toData(scheduleDetails));

        reply.send({message: 'Tee time booked immediately!'});
      }
    }
  );
}
