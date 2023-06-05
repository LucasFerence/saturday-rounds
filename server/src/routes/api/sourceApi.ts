import {FastifyInstance} from 'fastify';
import {ApiConfig} from 'src/plugins/api/detailsApi';
import {Source, SourceSchema, SourceType} from 'src/schema/source';

export default async function sourceApi(fastify: FastifyInstance) {
  const apiConfig: ApiConfig<Source> = {
    routePrefix: '/source',
    permission: 'source',
    schema: new SourceSchema(),
    type: SourceType,
    supportsGet: true,
    supportsCreate: true,
    supportsUpdate: true,
  };

  fastify.registerDetailsApi(apiConfig);
}
