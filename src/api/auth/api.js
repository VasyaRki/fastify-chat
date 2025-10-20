import { getErrorMessage } from '../shared.js';
import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ authService }) => ({
  signIn: {
    method: 'post',
    access: 'none',
    schema: schemas.signIn,
    handler: async (_session, request, reply) => {
      try {
        const { email, password } = request.body;

        return await authService.signIn(email, password);
      } catch (error) {
        console.error('Error signing in:', error);
        const errorMessage = getErrorMessage(error);

        if (
          errorMessage === 'Invalid credentials' ||
          errorMessage === 'User not found'
        ) {
          return reply.code(401).send({
            error: 'Unauthorized',
            message: 'Invalid email or password',
          });
        }

        return reply.code(500).send({
          error: 'Failed to sign in',
          message: errorMessage,
        });
      }
    },
  },

  signUp: {
    method: 'post',
    access: 'none',
    schema: schemas.signUp,
    handler: async (_session, request, reply) => {
      try {
        const { email, username, password } = request.body;

        return await authService.signUp(email, username, password);
      } catch (error) {
        console.error('Error signing up:', error);
        const errorMessage = getErrorMessage(error);

        if (errorMessage === 'User already exists') {
          return reply.code(409).send({
            error: 'Conflict',
            message: 'User with this email already exists',
          });
        }

        if (errorMessage.includes('validation')) {
          return reply.code(400).send({
            error: 'Bad Request',
            message: errorMessage,
          });
        }

        return reply.code(500).send({
          error: 'Failed to sign up',
          message: errorMessage,
        });
      }
    },
  },

  verify: {
    method: 'get',
    access: 'common',
    schema: schemas.verify,
    handler: async (session, request, reply) => {
      try {
        const { user } = session;

        if (!user) {
          return reply.code(401).send({
            error: 'Unauthorized',
            message: 'User session not found',
          });
        }

        return user;
      } catch (error) {
        console.error('Error verifying user:', error);
        return reply.code(500).send({
          error: 'Failed to verify user',
          message: getErrorMessage(error),
        });
      }
    },
  },
});
