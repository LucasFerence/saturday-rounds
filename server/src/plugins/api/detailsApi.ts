import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {TObject} from '@sinclair/typebox';
import {DataTProperties, Schema} from 'src/schema/schema';
import {DataDocument} from 'src/schema/schema';

const PLUGIN_NAME = 'detailsApi';

declare module 'fastify' {
  interface FastifyInstance {
    registerDetailsApi: <T extends DataDocument>(apiConfig: ApiConfig) => void;
  }
}

const registerDetailsApi: FastifyPluginAsync = async (
  fastify: FastifyInstance
) => {
  fastify.decorate('registerDetailsApi', (apiConfig: ApiConfig) => {
    // Create a new details API object and register the supported endpoints
    const detailsApi = new DetailsApi(fastify, apiConfig);

    if (apiConfig.supportsGet) detailsApi.supportGetById();
    if (apiConfig.supportsCreate) detailsApi.supportCreate();
    if (apiConfig.supportsUpdate) detailsApi.supportUpdate();
  });
};

export interface ApiConfig {
  routePrefix: string;
  permission: string;
  schema: Schema;
  type: TObject<DataTProperties>;
  supportsGet: boolean;
  supportsCreate: boolean;
  supportsUpdate: boolean;
}

class DetailsApi<T extends DataDocument> {
  fastify: FastifyInstance;
  config: ApiConfig;

  constructor(fastify: FastifyInstance, config: ApiConfig) {
    this.fastify = fastify;
    this.config = config;
  }

  supportGetById(): DetailsApi<T> {
    interface GetParams {
      itemId: string;
    }

    this.fastify.get<{Params: GetParams}>(
      `${this.config.routePrefix}/:itemId`,
      {
        schema: {
          response: {
            200: this.config.type,
          },
        },
        preValidation: (req, reply) =>
          this.fastify.authorize(req, reply, [
            `read:${this.config.permission}`,
          ]),
      },
      async (request, reply) => {
        const {itemId} = request.params;

        const item = await this.fastify
          .databaseAccess(this.config.schema)
          .get(this.fastify, itemId);

        reply.status(200);
        reply.send(item);
      }
    );

    return this;
  }

  supportCreate(): DetailsApi<T> {
    this.fastify.post<{Body: T}>(
      `${this.config.routePrefix}/create`,
      {
        schema: {
          body: this.config.type,
        },
        preValidation: (req, reply) =>
          this.fastify.authorize(req, reply, [
            `create:${this.config.permission}`,
          ]),
      },
      async (request, reply) => {
        const _id = request.body;

        // Make sure the _id exists
        if (_id === null || _id === undefined) {
          reply.status(400);
          reply.send('No provided _id');
          return;
        }

        await this.fastify
          .databaseAccess(this.config.schema)
          .write(this.fastify, request.body as T, true);

        reply.status(200);
      }
    );

    return this;
  }

  supportUpdate(): DetailsApi<T> {
    this.fastify.post<{Body: T}>(
      `${this.config.routePrefix}/update`,
      {
        schema: {
          body: this.config.type,
        },
        preValidation: (req, reply) =>
          this.fastify.authorize(req, reply, [
            `update:${this.config.permission}`,
          ]),
      },
      async (request, reply) => {
        const _id = request.body;

        // Make sure the _id exists
        if (_id === null || _id === undefined) {
          reply.status(400);
          reply.send('No provided _id');
          return;
        }

        await this.fastify
          .databaseAccess(this.config.schema)
          .write(this.fastify, request.body as T, false);

        reply.status(200);
      }
    );

    return this;
  }
}

export default fp(registerDetailsApi, {
  name: PLUGIN_NAME,
  dependencies: ['databaseAccess'],
});
