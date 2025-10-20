import 'dotenv/config';
import { env } from './utils/env/util.js';

export const config = {
  server: {
    port: parseInt(process.env.PORT || '8080'),
    host: process.env.HOST || '0.0.0.0',
  },
  pg: {
    host: env.requireEnv('PG_HOST'),
    port: parseInt(env.requireEnv('PG_PORT')),
    user: env.requireEnv('PG_USER'),
    database: env.requireEnv('PG_DATABASE'),
    password: env.requireEnv('PG_PASSWORD'),
  },
  jwt: {
    tokenTtl: parseInt(env.requireEnv('JWT_TOKEN_TTL')),
    publicKeyFiePath: env.requireEnv('PUBLIC_KEY_FILENAME'),
    privateKeyFiePath: env.requireEnv('PRIVATE_KEY_FILENAME'),
  },
};
