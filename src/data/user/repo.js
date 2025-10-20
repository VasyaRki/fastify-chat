import { create, selectOne } from './sql.js';

/** @type {import('./types').init} */
export const init = (pool) => ({
  findById: async (id) => {
    const { query, params } = selectOne({ id });

    const {
      rows: [user],
    } = await pool.query(query, params);

    return user;
  },

  findOne: async (definition) => {
    const { query, params } = selectOne(definition);

    const {
      rows: [user],
    } = await pool.query(query, params);

    return user;
  },

  create: async (user) => {
    const { query, params } = create(user);

    const {
      rows: [row],
    } = await pool.query(query, params);

    return row;
  },
});
