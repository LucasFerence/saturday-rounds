import {FastifyInstance} from 'fastify';
import {Source, SourceSchema, SourceType} from 'src/schema/source';

const PREFIX = '/source';

export default async function sourceApi(fastify: FastifyInstance) {
  /**
   * Get a source given a :sourceId
   * Example: http/localhost:5050/source/{sourceId}
   */
  interface GetParams {
    sourceId: string;
  }

  fastify.get<{Params: GetParams}>(
    `${PREFIX}/:sourceId`,
    {
      schema: {
        response: {
          200: SourceType,
        },
      },
      preValidation: (req, reply) =>
        fastify.authorize(req, reply, ['read:sources']),
    },
    async (request, reply) => {
      const {sourceId} = request.params;

      const source = await fastify
        .databaseAccess(new SourceSchema())
        .get(fastify, sourceId);

      reply.status(200);
      reply.send(source);
    }
  );

  /**
   * Update a source in database with Body SourceType
   * Important: ensure that the body that is sent has an _id value
   */
  fastify.post<{Body: Source}>(
    `${PREFIX}/update`,
    {
      schema: {
        body: SourceType,
      },
      preValidation: (req, reply) =>
        fastify.authorize(req, reply, ['write:sources']),
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
        .databaseAccess(new SourceSchema())
        .write(fastify, req.body, false);

      reply.status(200);
    }
  );

  /**
   * Create a source in database with Body SourceType
   * Important: ensure that the body that is sent has an _id value
   */
  fastify.post<{Body: Source}>(
    `${PREFIX}/create`,
    {
      schema: {
        body: SourceType,
      },
      preValidation: (req, reply) =>
        fastify.authorize(req, reply, ['write:sources']),
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
        .databaseAccess(new SourceSchema())
        .write(fastify, req.body, true);

      reply.status(200);
    }
  );
}
