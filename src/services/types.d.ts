import type { Repos } from '../data/types.js';
import type { AuthService } from './auth/types.d.ts';
import type { UserService } from './user/types.d.ts';
import type { MessageService } from './message/types.js';

export interface Services {
  auth: AuthService;
  user: UserService;
  message: MessageService;
}

export function init(repos: Repos): Services;
