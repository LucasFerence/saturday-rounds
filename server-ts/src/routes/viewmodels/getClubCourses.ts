import {FastifyInstance} from 'fastify';
import {Club, ClubType} from 'src/schema/chronogolf/club';

interface RequestParams {
  clubId: string;
}

export default async function getClubCourses(server: FastifyInstance) {
  server.get<{Params: RequestParams; Reply: Club}>(
    '/courses/:clubId',
    {
      schema: {
        response: {
          200: ClubType,
        },
      },
      preValidation: (req, reply) =>
        server.authorize(req, reply, ['read:courses']),
    },
    async (request, reply) => {
      const {clubId} = request.params;
      const club = await server.getChronogolfClub(clubId);

      reply.send(club);
    }
  );
}
