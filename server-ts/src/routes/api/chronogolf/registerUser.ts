import {FastifyInstance} from 'fastify';
import {User, UserType} from 'src/schema/chronogolf/user';

export default async function registerUser(server: FastifyInstance) {
  server.post<{Body: User}>(
    '/registerChronogolfUser',
    {
      schema: {
        body: UserType,
      },
    },
    async (request, reply) => {
      server.upsertChronogolfUser(request.body);
      reply.status(200);
    }
  );
}
