import { authHeaders } from '../schemaParts.js';

export const signIn = /** @type {const} */ ({
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
      },
      required: ['email', 'password'],
      additionalProperties: false,
    },
  },
  required: ['body'],
});

export const signUp = /** @type {const} */ ({
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        username: { type: 'string', minLength: 5 },
        password: { type: 'string', minLength: 6 },
      },
      required: ['email', 'username', 'password'],
      additionalProperties: false,
    },
  },
  required: ['body'],
});

export const verify = /** @type {const} */ ({
  type: 'object',
  properties: {
    headers: authHeaders,
  },
  required: ['headers'],
});
