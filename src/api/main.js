import { init as authApiInit } from './auth/api.js';
import { init as userApiInit } from './user/api.js';
import { init as messageApiInit } from './message/api.js';

/** @type {import('./types.d.ts').init} */
export const init = (services) => {
  const authApi = authApiInit({ authService: services.auth });
  const userApi = userApiInit({ userService: services.user });
  const messageApi = messageApiInit({
    messageService: services.message,
  });

  return {
    auth: authApi,
    user: userApi,
    message: messageApi,
  };
};
