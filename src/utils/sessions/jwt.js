import { Buffer } from 'node:buffer';
import { createSign, createVerify } from 'node:crypto';
import { exception } from '../exception/util.js';

/** @type {import('./types.js').Jwt} */
export const jwt = {
  headerObject: {
    alg: 'RS256',
    typ: 'JWT',
  },

  issue: (privateKey, payload, ttl) => {
    const headerString = JSON.stringify(jwt.headerObject);
    const encodedHeader = Buffer.from(headerString).toString('base64url');
    const payloadString = JSON.stringify({
      iss: 'test-task',
      exp: Date.now() + ttl,
      ...payload,
    });

    const encodedPayload = Buffer.from(payloadString).toString('base64url');
    const sign = createSign('SHA256');
    sign.write(encodedHeader + '.' + encodedPayload);
    sign.end();
    const signature = sign.sign(privateKey, 'base64url');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  },

  verify: (publicKey, token) => {
    const [jwtHeader, encodedPayload, jwtSignature] = token.split('.');
    const verify = createVerify('SHA256');
    verify.write(jwtHeader + '.' + encodedPayload);
    verify.end();
    const valid = verify.verify(publicKey, jwtSignature, 'base64url');
    if (!valid) throw exception.unauthorized();
    const jwtPayload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf-8'),
    );
    if (jwtPayload.exp < Date.now()) throw exception.unauthorized();

    return jwtPayload;
  },
};
