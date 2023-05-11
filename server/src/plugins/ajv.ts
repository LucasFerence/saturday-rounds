import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import Ajv from 'ajv';

declare module 'fastify' {
  interface FastifyInstance {
    ajv: Ajv;
  }
}
/*
Configure AJV to autmaticallyremove additional properties
from the incoming types if denoted on the type

TypeBox must have {additionalProperties: false} to have them automatically removed
*/
const ajv: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorate('ajv', {getter: () => new Ajv({removeAdditional: true})});
};

export default fp(ajv, {
  name: 'ajv',
});
