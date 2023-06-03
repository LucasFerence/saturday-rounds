import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {User, USER_COLLECTION} from 'src/schema/chronogolf/user';

declare module 'fastify' {
  interface FastifyInstance {
    getChronogolfUser: (id: string) => Promise<User>;
    upsertChronogolfUser: (user: User) => void;
  }
}
/*
Test comment
*/
const chronogolfUsers: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.decorate('getChronogolfUser', (id: string) => getUser(fastify, id));
  fastify.decorate('upsertChronogolfUser', (user: User) =>
    upsertUser(fastify, user)
  );
};

/*
Gets a user from the database using their app level ID
*/
async function getUser(fastify: FastifyInstance, id: string): Promise<User> {
  const collection = fastify.mongo.db?.collection(USER_COLLECTION);
  const query = {id: id};

  return (await collection?.findOne(query)) as User;
}

/*
Updates or inserts a user into the db
*/
async function upsertUser(fastify: FastifyInstance, user: User) {
  const collection = fastify.mongo.db?.collection(USER_COLLECTION);

  const filter = {id: user.id};
  const options = {upsert: true};

  const updateDoc = {
    $set: {
      username: user.username,
      password: user.password,
    },
  };

  await collection?.updateOne(filter, updateDoc, options);
}

export default fp(chronogolfUsers, {
  name: 'chronogolfUsers',
  dependencies: ['mongo'],
});
