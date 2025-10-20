import { authHeaders } from '../schemaParts.js';

export const me = /** @type {const} */ ({
  type: 'object',
  properties: {
    headers: authHeaders,
  },
  required: ['headers'],
});
