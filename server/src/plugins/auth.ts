import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import fp from 'fastify-plugin';

// Add additional fields onto jwt data
declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      permissions: [string];
    };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authorize: (
      request: FastifyRequest,
      reply: FastifyReply,
      permissions?: [string]
    ) => void;
  }
}

const auth: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // Authenticate EVERY request
  fastify.addHook(
    'preValidation',
    async (request: FastifyRequest, reply: FastifyReply) => {
      await fastify.authenticate(request, reply);
    }
  );

  fastify.decorate(
    'authorize',
    async (
      request: FastifyRequest,
      reply: FastifyReply,
      permissions?: [string]
    ) => {
      const userPermissions = request.user.permissions;

      if (permissions && !permissions.every(p => userPermissions.includes(p))) {
        reply.status(401);
        return;
      }
    }
  );
};

export default fp(auth, {
  name: 'auth',
});
