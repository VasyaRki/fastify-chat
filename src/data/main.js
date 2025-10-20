import { init as userRepoInit } from './user/repo.js';
import { init as messageRepoInit } from './message/repo.js';
import { init as fileRepoInit } from './file/repo.js';
import { init as messageFilesRepoInit } from './message-files/repo.js';

/** @type {import('./types.d.ts').init} */
export const init = (pool) => {
  const userRepo = userRepoInit(pool);
  const fileRepo = fileRepoInit(pool);
  const messageRepo = messageRepoInit(pool);
  const messageFilesRepo = messageFilesRepoInit(pool);

  return {
    user: userRepo,
    file: fileRepo,
    message: messageRepo,
    messageFiles: messageFilesRepo,
  };
};
