import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';

import nodeConfig, {IConfig} from 'config';

declare module 'fastify' {
  interface FastifyInstance {
    config: IConfig;
  }
}

const config: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorate('config', {getter: () => nodeConfig.get('root')});
};

export default fp(config, {
  name: 'config',
});
