import crypto from 'node:crypto';

/** @type {import('./types.d.ts').Passwords} */
export const passwords = {
  hash: (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashed = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');

    return `${salt}:${hashed}`;
  },

  compare: (password, hash) => {
    const [salt, hashed] = hash.split(':');

    return (
      hashed ===
      crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    );
  },
};
