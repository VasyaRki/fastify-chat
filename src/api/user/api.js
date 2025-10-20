import { getErrorMessage } from '../shared.js';
import * as schemas from './schemas.js';

/** @type {import('./types').init} */
export const init = ({ userService }) => ({
  me: {
    method: 'get',
    access: 'common',
    schema: schemas.me,
    handler: async (session, _request, reply) => {
      try {
        const { user } = session;

        if (!user?.id) {
          return reply.code(401).send({
            error: 'Unauthorized',
            message: 'User not authenticated',
          });
        }

        const userData = await userService.findById(user.id);

        if (!userData) {
          return reply.code(404).send({
            error: 'Not Found',
            message: 'User not found',
          });
        }

        return userData;
      } catch (error) {
        console.error('Error fetching user data:', error);
        return reply.code(500).send({
          error: 'Failed to fetch user data',
          message: getErrorMessage(error),
        });
      }
    },
  },
});
