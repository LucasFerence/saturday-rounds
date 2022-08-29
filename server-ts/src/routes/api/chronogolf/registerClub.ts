import {FastifyInstance} from 'fastify';
import {Club, ClubType} from 'src/schema/chronogolf/club';

export default async function registerClub(server: FastifyInstance) {
  server.post<{Body: Club}>(
    '/registerChronogolfClub',
    {
      schema: {
        body: ClubType,
      },
      preValidation: (req, reply) =>
        server.authorize(req, reply, ['write:courses']),
    },
    async (request, reply) => {
      server.upsertChronogolfClub(request.body);
      reply.status(200);
    }
  );
}
