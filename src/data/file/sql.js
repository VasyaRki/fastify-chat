/** @typedef {import('../../entities/file').File} File */

/**
 * @param {Omit<File, 'id'>} file
 * @returns {{ query: string, params: any[] }}
 */
export const create = (file) => {
  const { mimetype, url, filename } = file;

  const fields = ['mimetype', 'url', 'filename'];
  const values = ['$1', '$2', '$3'];

  const query = `
    INSERT INTO "files"
    (${fields.map((f) => `"${f}"`).join(', ')})
    VALUES(${values.join(', ')})
    RETURNING *
  `;

  const params = [mimetype, url, filename];

  return { query, params };
};
