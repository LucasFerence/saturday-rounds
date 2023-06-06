import {FastifyInstance} from 'fastify';
import {ApiConfig} from 'src/plugins/api/detailsApi';
import {User, UserSchema, UserType} from 'src/schema/user';

export default async function userApi(fastify: FastifyInstance) {
  const apiConfig: ApiConfig<User> = {
    routePrefix: '/user',
    permission: 'user',
    schema: new UserSchema(),
    type: UserType,
    supportsGet: true,
    supportsCreate: true,
    supportsUpdate: true,
  };

  fastify.registerDetailsApi(apiConfig);
}
