import {FastifyInstance} from 'fastify';
import {Provider, ProviderSchema, ProviderType} from 'src/schema/provider';

const PREFIX = '/provider';

export default async function providerApi(fastify: FastifyInstance) {
  /**
   * Get a provider given a :providerId
   * Example: http/localhost:5050/provider/{providerId}
   */
  interface GetParams {
    providerId: string;
  }

  fastify.get<{Params: GetParams}>(
    `${PREFIX}/:providerId`,
    {
      schema: {
        response: {
          200: ProviderType,
        },
      },
      preValidation: (req, reply) =>
        fastify.authorize(req, reply, ['read:providers']),
    },
    async (request, reply) => {
      const {providerId} = request.params;

      const provider = await fastify
        .databaseAccess(new ProviderSchema())
        .get(fastify, providerId);

      reply.status(200);
      reply.send(provider);
    }
  );

  /**
   * Update a provider in database with Body ProviderType
   * Important: ensure that the body that is sent has an _id value
   */
  fastify.post<{Body: Provider}>(
    `${PREFIX}/update`,
    {
      schema: {
        body: ProviderType,
      },
      preValidation: (req, reply) =>
        fastify.authorize(req, reply, ['write:providers']),
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
        .databaseAccess(new ProviderSchema())
        .write(fastify, req.body, false);

      reply.status(200);
    }
  );

  /**
   * Create a provider in database with Body ProviderType
   * Important: ensure that the body that is sent has an _id value
   */
  fastify.post<{Body: Provider}>(
    `${PREFIX}/create`,
    {
      schema: {
        body: ProviderType,
      },
      preValidation: (req, reply) =>
        fastify.authorize(req, reply, ['write:providers']),
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
        .databaseAccess(new ProviderSchema())
        .write(fastify, req.body, true);

      reply.status(200);
    }
  );
}