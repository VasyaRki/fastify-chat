import * as fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { jwt } from './jwt.js';
import { config } from '../../config.js';
import { exception } from '../exception/util.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('./types.js').Sessions} */
export const sessions = {
  generate: async (user) => {
    const { id } = user;
    const filePath = path.join(__dirname, config.jwt.privateKeyFiePath);
    const privateKey = await fsp.readFile(filePath, 'utf8');
    const token = jwt.issue(privateKey, { id }, config.jwt.tokenTtl);

    return { token, user };
  },

  validate: async (token) => {
    if (!token) throw exception.unauthorized('No token provided.');
    const filePath = path.join(__dirname, config.jwt.publicKeyFiePath);
    const publicKey = await fsp.readFile(filePath, 'utf8');

    return jwt.verify(publicKey, token);
  },
};
