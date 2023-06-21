import fastify from 'fastify';
import autoload from '@fastify/autoload';
import {TypeBoxTypeProvider} from '@fastify/type-provider-typebox';
import {exit} from 'process';
import path from 'path';
import 'fastify-auth0-verify';

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

// Plugins
server.register(autoload, {
  dir: path.join(__dirname, 'plugins'),
});

// Auth
server.register(require('fastify-auth0-verify'), {
  domain: 'dev-fkh-ll2p.us.auth0.com',
  audience: 'http://localhost:5050',
});

// Routes
server.register(autoload, {
  dir: path.join(__dirname, 'routes'),
  dirNameRoutePrefix: false,
});

server.listen({port: 5050, host: '0.0.0.0'}, (err, address) => {
  if (err) {
    console.error(err);
    exit(1);
  }

  console.log(`Server listening at ${address}`);
});

// Handle shutdown
process.on('SIGTERM', () => {
  server.close();
  throw new Error('Server closed');
});

process.on('SIGINT', () => {
  server.close();
  throw new Error('Server closed');
});
