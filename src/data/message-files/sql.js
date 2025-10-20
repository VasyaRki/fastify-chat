/** @typedef {import('../../entities/message-files').MessageFiles} MessageFiles */

/**
 * @param {Omit<MessageFiles, 'id' | 'createdAt'>} messageFile
 * @returns {{ query: string, params: any[] }}
 */
export const create = (messageFile) => {
  const { fileId, messageId } = messageFile;

  const fields = ['file_id', 'message_id'];
  const values = ['$1', '$2'];

  const query = `
    INSERT INTO "message_files"
    (${fields.map((f) => `"${f}"`).join(', ')})
    VALUES(${values.join(', ')})
    RETURNING *
  `;

  const params = [fileId, messageId];

  return { query, params };
};
