export const authHeaders = /** @type {const} */ ({
  type: 'object',
  properties: {
    authorization: { type: 'string' },
  },
  required: ['authorization'],
});
