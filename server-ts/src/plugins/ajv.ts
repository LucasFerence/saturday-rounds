import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import Ajv from 'ajv';

declare module 'fastify' {
  interface FastifyInstance {
    ajv: Ajv;
  }
}

const ajv: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorate('ajv', {getter: () => new Ajv()});
};

export default fp(ajv, {
  name: 'ajv',
});
