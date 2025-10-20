import { create } from './sql.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => ({
  create: async (messageFiles) => {
    const { query, params } = create(messageFiles);

    const {
      rows: [row],
    } = await pool.query(query, params);

    return row;
  },
});
