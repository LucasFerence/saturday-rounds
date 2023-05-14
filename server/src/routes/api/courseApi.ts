import {FastifyInstance} from 'fastify';
import {Course, CourseSchema, CourseType} from 'src/schema/course';

const PREFIX = '/course';

export default async function getCourseApi(fastify: FastifyInstance) {
  /**
   * Get a course given a :courseId
   * Example: http/localhost:5050/course/{courseId}
   */
  interface GetParams {
    courseId: string;
  }

  fastify.get<{Params: GetParams}>(
    `${PREFIX}/:courseId`,
    {
      schema: {
        response: {
          200: CourseType,
        },
      },
      preValidation: (req, reply) =>
        fastify.authorize(req, reply, ['read:courses']),
    },
    async (request, reply) => {
      const {courseId} = request.params;

      const course = await fastify
        .databaseAccess(new CourseSchema())
        .get(fastify, courseId);

      reply.status(200);
      reply.send(course);
    }
  );

  /**
   * Update a course in database with Body CourseType
   * Important: ensure that the body that is sent has an _id value
   */
  fastify.post<{Body: Course}>(
    `${PREFIX}/update`,
    {
      schema: {
        body: CourseType,
      },
      preValidation: (req, reply) =>
        fastify.authorize(req, reply, ['write:courses']),
    },
    async (req, reply) => {
      const _id = req.body._id;

      // Make sure the _id exists
      if (_id === null || _id === undefined) {
        reply.status(400);
        reply.send('No provided _id');
        return;
      }

      await fastify
        .databaseAccess(new CourseSchema())
        .write(fastify, req.body, false);

      reply.status(200);
    }
  );

  /**
   * Create a course in database with Body CourseType
   * Important: ensure that the body that is sent has an _id value
   */
  fastify.post<{Body: Course}>(
    `${PREFIX}/create`,
    {
      schema: {
        body: CourseType,
      },
      preValidation: (req, reply) =>
        fastify.authorize(req, reply, ['write:courses']),
    },
    async (req, reply) => {
      const _id = req.body._id;

      // Make sure the _id does not exist
      if (_id !== null && _id !== undefined) {
        reply.status(400);
        reply.send('Cannot provide _id');
        return;
      }

      await fastify
        .databaseAccess(new CourseSchema())
        .write(fastify, req.body, true);

      reply.status(200);
    }
  );
}
