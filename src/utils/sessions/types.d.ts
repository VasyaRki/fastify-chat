import type { User } from '../../entities/user.js';
import type { Session } from '../../services/auth/types.js';

interface TokenPayload {
  id: number;
}

export interface Sessions {
  generate(payload: User): Promise<Session>;
  validate(token: string): Promise<TokenPayload>;
}

export interface Jwt {
  issue(privateKey: string, payload: TokenPayload, ttl: number): string;
  verify(publicKey: string, token: string): TokenPayload;
  headerObject: {
    alg: string;
    typ: string;
  };
}
