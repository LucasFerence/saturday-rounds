import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {Collection} from 'node_modules/mongodb';
import {v4 as uuid} from 'uuid';
import {DataDocument, Schema} from 'src/schema/schema';

/*
This class defines the database access plugin. This provides
generic access to the underlying Mongo DB.

The access if provided through the FastifyInstance, and can be accessed like
this:

`fastify.databaseAccess(new MySchema()).write(fastify, {myObj});`

Note above, you must provide a Schema.
*/

const PLUGIN_NAME = 'databaseAccess';

// Define the additional method on fastify
declare module 'fastify' {
  interface FastifyInstance {
    databaseAccess: <T extends DataDocument>(
      schema: Schema<T>
    ) => DatabaseAccess<T, Schema<T>>;
  }
}

// Decorate fastify with the courseAccess class
const databaseAccess: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorate(
    PLUGIN_NAME,
    <T extends DataDocument>(schema: Schema<T>): DatabaseAccess<T, Schema<T>> =>
      new DatabaseAccess(schema)
  );
};

/**
 * Gets the collection given the fastify instance and the name of the collection.
 * Will pull from configured mongo plugin
 * @param fastify fastify instance
 * @param collection collection name
 * @returns {Collection<T> | undefined}
 */
function getCollection<T extends DataDocument>(
  fastify: FastifyInstance,
  collection: string
): Collection<T> | undefined {
  return fastify.mongo.db?.collection(collection);
}

/**
 * General access to the database. Required type parameters:
 * T: The relevant DataDocument to access the data with
 * S: The Schema which represents this DataDocument
 */
class DatabaseAccess<T extends DataDocument, S extends Schema<T>> {
  schema: S;

  constructor(schema: S) {
    this.schema = schema;
  }

  async get(fastify: FastifyInstance, _id: string): Promise<T> {
    const collection = getCollection(fastify, this.schema.collection);
    const query = {_id: _id};

    return (await collection?.findOne(query)) as unknown as T;
  }

  async write(fastify: FastifyInstance, item: T) {
    const collection = getCollection(fastify, this.schema.collection);

    // Use a UUID to generate a unique item
    const itemId = item._id !== undefined ? item._id : uuid();
    const filter = {_id: itemId};
    const options = {upsert: true};

    await collection?.replaceOne(filter, item, options);
  }
}

// Define the plugin and depend on the mongo plugin
export default fp(databaseAccess, {
  name: PLUGIN_NAME,
  dependencies: ['mongo'],
});
