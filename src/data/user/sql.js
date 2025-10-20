/** @typedef {import('../../entities/user').User} User */

/**
 * @param {Omit<User, 'id'>} definition
 * @returns {{ query: string, params: any[] }}
 */
export const create = (definition) => {
  const query = `
    INSERT INTO "user"
    ("email", "username", "password")
    VALUES($1, $2, $3)
    RETURNING *;
  `;

  const params = [definition.email, definition.username, definition.password];

  return { query, params };
};

/**
 * @param {Partial<User>} definition
 * @returns {{ query: string, params: any[] }}
 */
export const selectOne = (definition) => {
  const select = 'SELECT * from "user"';
  const where =
    ' WHERE ' +
    Object.keys(definition)
      .map((k, i) => `"${k}" = $${i + 1}`)
      .join(' AND ');

  const query = select + where + ';';

  const params = Object.values(definition);

  return { query, params };
};
