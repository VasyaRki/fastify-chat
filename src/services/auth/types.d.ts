import type { User } from '../../entities/user.d.ts';
import type { UserRepo } from '../../data/user/types.d.ts';

export interface Session {
  user: User;
  token: string;
}

interface Deps {
  userRepo: UserRepo;
}

interface AuthService {
  signIn: (email: string, password: string) => Promise<Session>;
  signUp: (
    email: string,
    username: string,
    password: string,
  ) => Promise<Session>;
  verify: (token?: string, access?: 'none' | 'common') => Promise<Session>;
}

export function init(deps: Deps): AuthService;
