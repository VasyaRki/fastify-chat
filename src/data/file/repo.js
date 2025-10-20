import { create } from './sql.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => ({
  create: async (file) => {
    const { query, params } = create(file);

    const {
      rows: [row],
    } = await pool.query(query, params);

    return row;
  },
});
