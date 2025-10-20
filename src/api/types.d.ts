import type { Services } from '../services/types.d.ts';
import type { Session } from '../services/auth/types.d.ts';
import type { UserApi } from './user/types.d.ts';
import type { AuthApi } from './auth/types.d.ts';
import type { MessageApi } from './message/types.d.ts';

export interface Endpoint<
  Params,
  Result,
  Access extends 'none' | 'common',
  SessionGeneric extends Session | null,
> {
  method: 'get' | 'post' | 'put' | 'delete';
  access: Access;
  params?: string[];
  schema: { properties: object; [key: string]: any };
  handler: (session: SessionGeneric, params: Params, reply?: any) => Result;
}

export type ProtectedEndpoint<Params, Result> = Endpoint<
  Params,
  Result,
  'common',
  Session
>;

export type UnprotectedEndpoint<Params, Result> = Endpoint<
  Params,
  Result,
  'none',
  null
>;

export interface API {
  [key: string]: Endpoint<any, any, any, any>;
}

export interface APIs extends Record<string, API> {
  auth: AuthApi;
  user: UserApi;
  message: MessageApi;
}

export function init(services: Services): APIs;
