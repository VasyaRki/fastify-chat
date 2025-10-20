/** @type {import('./types').Env} */
export const env = {
  requireEnv: (name) => {
    const env = process.env[name];
    if (!env) throw new Error(`Missing required env "${name}"`);
    return env;
  },
};
