import {FastifyInstance} from 'fastify';
import {Course, CourseSchema, CourseType} from 'src/schema/course';

export default async function test(fastify: FastifyInstance) {
  fastify.post<{Body: Course}>(
    '/test',
    {
      schema: {
        body: CourseType,
      },
      preValidation: (req, reply) =>
        fastify.authorize(req, reply, ['write:courses']),
    },
    async (request, reply) => {
      fastify.databaseAccess(new CourseSchema()).write(fastify, request.body);
      reply.status(200);
    }
  );
}
