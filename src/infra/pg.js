import pg from 'pg';

/** @param {import('pg').PoolConfig} config */
export const init = async (config) => {
  try {
    const pool = new pg.Pool(config);
    await pool.query('SELECT 1');

    return pool;
  } catch (error) {
    console.log({ timestamp: Date.now(), error });
    throw Error('Database connection failed');
  }
};
