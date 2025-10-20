/** @typedef {import('./api/types.js').API} API */

import { config } from './config.js';
import { init as pgPoolInit } from './infra/pg.js';
import { init as reposInit } from './data/main.js';
import { init as servicesInit } from './services/main.js';
import { init as apisInit } from './api/main.js';
import { init as serverInit, server } from './server/server.js';
import { init as websocketInit } from './server/websocket.js';

const pool = await pgPoolInit(config.pg);
const repos = reposInit(pool);
const services = servicesInit(repos);
const apis = apisInit(services);
serverInit({ services, apis });
websocketInit({ server, services });
