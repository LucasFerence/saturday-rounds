import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {Club, CLUB_COLLECTION} from 'src/schema/chronogolf/club';

declare module 'fastify' {
  interface FastifyInstance {
    getChronogolfClub: (id: string) => Promise<Club>;
    upsertChronogolfClub: (club: Club) => void;
  }
}

const chronogolfClubs: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.decorate('getChronogolfClub', (id: string) => getClub(fastify, id));
  fastify.decorate('upsertChronogolfClub', (user: Club) =>
    upsertClub(fastify, user)
  );
};

/*
Gets a club from the database using the club ID
*/
async function getClub(fastify: FastifyInstance, id: string): Promise<Club> {
  const collection = fastify.mongo.db?.collection(CLUB_COLLECTION);
  const query = {id: id};

  return (await collection?.findOne(query)) as Club;
}

/*
Updates or inserts a club and it's associated courses into the db
*/
async function upsertClub(fastify: FastifyInstance, club: Club) {
  const collection = fastify.mongo.db?.collection(CLUB_COLLECTION);

  const filter = {id: club.id};
  const options = {upsert: true};

  const updateDoc = {
    $set: {
      name: club.name,
      scheduleOffsetDays: club.scheduleOffsetDays,
      scheduleOffsetHours: club.scheduleOffsetHours,
      courses: club.courses,
    },
  };

  await collection?.updateOne(filter, updateDoc, options);
}

export default fp(chronogolfClubs, {
  name: 'chronogolfClubs',
  dependencies: ['mongo'],
});
