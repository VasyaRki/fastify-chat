import { readFile } from 'node:fs/promises';
import pg from 'pg';
import { config } from '../src/config.js';

const action = process.argv[2];

const queryBuilder = {
  up: async () => {
    const buffer = await readFile('db/v1.sql');
    return buffer.toString();
  },

  down: async () => {
    return `
      DROP SCHEMA "abstract" CASCADE;
      DROP SCHEMA "crypto" CASCADE;
      DROP SCHEMA "etf" CASCADE;
      DROP SCHEMA "fiat" CASCADE;
      DROP SCHEMA "stock" CASCADE;
      DROP SCHEMA "user" CASCADE;
    `;
  },
}[action];

const pool = new pg.Pool(config.pg);

try {
  if (!queryBuilder) throw Error(`Invalid action: ${action}`);
  const query = await queryBuilder();
  await pool.query(query);
  console.log('Migration ran successfully.');
} catch (e) {
  console.log('Migration failed:', e);
} finally {
  await pool.end();
}
