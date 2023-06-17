import {FastifyInstance} from 'fastify';
import {ApiConfig} from 'src/plugins/api/detailsApi';
import {Aggregate, AggregateSchema, AggregateType} from 'src/schema/aggregate';

export default async function aggregateApi(fastify: FastifyInstance) {
  const apiConfig: ApiConfig<Aggregate> = {
    routePrefix: '/aggregate',
    permission: 'aggregate',
    schema: new AggregateSchema(),
    type: AggregateType,
    supportsGet: true,
    supportsCreate: true,
    supportsUpdate: true,
  };

  fastify.registerDetailsApi(apiConfig);
}
