import { init as authServiceInit } from './auth/service.js';
import { init as userServiceInit } from './user/service.js';
import { init as messageServiceInit } from './message/service.js';

/** @type {import('./types.d.ts').init} */
export const init = (repos) => {
  const authService = authServiceInit({ userRepo: repos.user });
  const userService = userServiceInit({ userRepo: repos.user });
  const messageService = messageServiceInit({
    messageRepo: repos.message,
    userRepo: repos.user,
    fileRepo: repos.file,
    messageFilesRepo: repos.messageFiles,
  });

  return {
    user: userService,
    auth: authService,
    message: messageService,
  };
};
