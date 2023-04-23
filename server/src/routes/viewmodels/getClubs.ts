import {FastifyInstance} from 'fastify';
import {Type} from '@sinclair/typebox';
import {Club, CLUB_COLLECTION} from 'src/schema/chronogolf/club';

const ResponseType = Type.Array(
  Type.Object({
    id: Type.String(),
    name: Type.String(),
  })
);

export default async function getClubs(server: FastifyInstance) {
  server.get<{Reply: Club[]}>(
    '/clubs',
    {
      schema: {
        response: {
          200: ResponseType,
        },
      },
      preValidation: (req, reply) =>
        server.authorize(req, reply, ['read:courses']),
    },
    async (request, reply) => {
      const collection = server.mongo.db?.collection(CLUB_COLLECTION);
      const options = {
        projection: {
          _id: 0,
          id: 1,
          name: 1,
        },
      };

      const clubs = (await collection?.find({}, options).toArray()) as Club[];

      reply.send(clubs);
    }
  );
}
