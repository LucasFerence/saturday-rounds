import {FastifyInstance} from 'fastify';
import {ApiConfig} from 'src/plugins/api/detailsApi';
import {ProviderSchema, ProviderType} from 'src/schema/provider';

export default async function providerApi(fastify: FastifyInstance) {
  const apiConfig: ApiConfig = {
    routePrefix: '/provider',
    permission: 'provider',
    schema: new ProviderSchema(),
    type: ProviderType,
    supportsGet: true,
    supportsCreate: true,
    supportsUpdate: true,
  };

  fastify.registerDetailsApi(apiConfig);
}
