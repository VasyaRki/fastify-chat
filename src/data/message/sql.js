/** @typedef {import('../../entities/message').Message} Message */

/**
 * @param {Omit<Message, 'id' | 'createdAt'>} message
 * @returns {{ query: string, params: any[] }}
 */
export const create = (message) => {
  const { text, userId } = message;
  const fields = ['text', 'user_id'];

  const values = ['$1', '$2'];

  const query = `
    INSERT INTO "messages"
    (${fields.map((f) => `"${f}"`).join(', ')})
    VALUES(${values.join(', ')})
    RETURNING *;
  `;

  const params = [text, userId];

  return { query, params };
};

/**
 * @param {number} id
 * @returns {{ query: string, params: any[] }}
 */
export const findById = (id) => {
  const query = `
    SELECT
      "messages"."id"         AS "message_id",
      "messages"."text"       AS "message_text",
      "messages"."created_at" AS "message_created_at",
      "messages"."user_id"    AS "user_id",
      "files"."id"            AS "file_id",
      "files"."url"           AS "file_url",
      "files"."mimetype"      AS "file_mimetype",
      "files"."filename"      AS "file_filename"
    FROM "messages"
    LEFT JOIN "message_files" ON "messages"."id" = "message_files"."message_id"
    LEFT JOIN "files" ON "message_files"."file_id" = "files"."id"
    WHERE "messages"."id" = $1;
  `;

  const params = [id];

  return { query, params };
};

/**
 * @param {{ limit: number; offset: number; }} opts
 * @returns {{ query: string, params: any[] }}
 */
export const findManyWithPagination = (opts) => {
  const { limit, offset } = opts;

  const query = `
    SELECT
      "messages"."id"         AS "message_id",
      "messages"."text"       AS "message_text",
      "messages"."created_at" AS "message_created_at",
      "user"."id"             AS "user_id",
      "user"."username"       AS "username",
      "files"."id"            AS "file_id",
      "files"."url"           AS "file_url"
    FROM "messages"
    LEFT JOIN "user" ON "messages"."user_id" = "user"."id"
    LEFT JOIN "message_files" ON "messages"."id" = "message_files"."message_id"
    LEFT JOIN "files" ON "message_files"."file_id" = "files"."id"
    ORDER BY "messages"."created_at" DESC
    LIMIT $1 OFFSET $2;

  `;

  const params = [limit, offset];

  return { query, params };
};
