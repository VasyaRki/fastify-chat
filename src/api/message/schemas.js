import { authHeaders } from '../schemaParts.js';

export const create = /** @type {const} */ ({
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        text: { type: 'string' },
      },
      required: ['text'],

      additionalProperties: false,
    },
    headers: authHeaders,
  },
  required: ['body', 'headers'],
});

export const file = /** @type {const} */ ({
  type: 'object',
  properties: {},
});

export const list = /** @type {const} */ ({
  type: 'object',
  properties: {
    headers: authHeaders,
    querystring: {
      type: 'object',
      properties: {
        page: { type: 'integer', minimum: 1 },
        limit: { type: 'integer', minimum: 1 },
      },
      required: ['page', 'limit'],
      additionalProperties: false,
    },
  },
  required: ['headers', 'querystring'],
});

export const content = /** @type {const} */ ({
  type: 'object',
  properties: {
    headers: authHeaders,
    querystring: {
      type: 'object',
      properties: {
        id: { type: 'integer', minimum: 1 },
      },
      required: ['id'],
      additionalProperties: false,
    },
  },
  required: ['headers', 'querystring'],
});
