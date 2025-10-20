/** @typedef {import('./types').Plugin} Plugin */

import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import multipart from '@fastify/multipart';
import websocket from '@fastify/websocket';
import { config } from '../config.js';

/** @type {Plugin} */
const corsPlugin = { plugin: cors };

/** @type {Plugin} */
const swaggerPlugin = {
  plugin: swagger,
  options: {
    swagger: {
      info: {
        title: 'Test Task API',
        version: '1',
      },
      host: `localhost:${config.server.port}`,
      schemes: ['http'],
      securityDefinitions: {
        ApiToken: {
          description: 'Authorization header token, sample: "SOME_TOKEN',
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  },
};

/** @type {Plugin} */
const swaggerUiPlugin = {
  plugin: swaggerUi,
  options: { routePrefix: '/documentation' },
};

/** @type {Plugin} */
const multipartPlugin = {
  plugin: multipart,
};

/** @type {Plugin} */
const websocketPlugin = {
  plugin: websocket,
};

export const plugins = [
  corsPlugin,
  swaggerPlugin,
  swaggerUiPlugin,
  multipartPlugin,
  websocketPlugin,
];
