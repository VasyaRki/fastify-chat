import * as SchemaType from 'json-schema-to-ts';
import type { API, ProtectedEndpoint } from '../types.d.ts';
import type { User } from '../../entities/user.d.ts';
import type { UserService } from '../../services/user/types.js';
import * as schemas from './schemas.js';

type MeParam = SchemaType.FromSchema<typeof schemas.me>;

export interface UserApi extends API {
  me: ProtectedEndpoint<MeParam, Promise<User>>;
}

interface Deps {
  userService: UserService;
}

export function init(deps: Deps): UserApi;
