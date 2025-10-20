import {
  FastifyPluginCallback,
  FastifyPluginAsync,
  FastifyPluginOptions,
  FastifyInstance,
} from 'fastify';
import type { APIs } from '../api/types.d.ts';
import type { Services } from '../services/types.d.ts';

export type Plugin = {
  plugin: FastifyPluginCallback | FastifyPluginAsync;
  options?: FastifyPluginOptions;
};

interface Deps {
  services: Services;
  apis: APIs;
}

export interface WebSocketDeps {
  server: FastifyInstance;
  services: Services;
}

export function init(deps: Deps): void;
export function initWebSocket(deps: WebSocketDeps): void;
