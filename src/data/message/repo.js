import { create, findById, findManyWithPagination } from './sql.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => ({
  create: async (message) => {
    const { query, params } = create(message);
    const {
      rows: [row],
    } = await pool.query(query, params);

    return {
      id: row.id,
      text: row.text,
      userId: row.user_id,
      createdAt: row.created_at,
    };
  },

  findById: async (id) => {
    const { query, params } = findById(id);
    const {
      rows: [row],
    } = await pool.query(query, params);

    if (!row) return null;

    return {
      id: row.message_id,
      text: row.message_text ?? undefined,
      userId: row.user_id,
      createdAt: row.message_created_at,
      file: row.file_id
        ? {
            id: row.file_id,
            url: row.file_url,
            mimetype: row.file_mimetype,
            filename: row.file_filename,
          }
        : undefined,
    };
  },

  findManyWithPagination: async (opts) => {
    const { query, params } = findManyWithPagination(opts);
    const { rows } = await pool.query(query, params);

    return rows.map((r) => {
      return {
        id: r.message_id,
        text: r.message_text ?? undefined,
        createdAt: r.message_created_at,
        user: {
          id: r.user_id,
          username: r.username,
        },
        file: {
          id: r.file_id,
          url: r.file_url,
        },
      };
    });
  },
});
