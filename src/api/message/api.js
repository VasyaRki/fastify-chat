import { getErrorMessage } from '../shared.js';
import * as schemas from './schemas.js';

/** @type {import('./types.js').init} */
export const init = ({ messageService }) => ({
  create: {
    method: 'post',
    access: 'common',
    schema: schemas.create,
    handler: async (session, request, reply) => {
      try {
        const { user } = session;
        const { text } = request.body;

        return await messageService.text(text, user);
      } catch (error) {
        console.error('Error creating text message:', error);
        return reply.code(500).send({
          error: 'Failed to create message',
          message: getErrorMessage(error),
        });
      }
    },
  },

  file: {
    method: 'post',
    access: 'common',
    schema: schemas.file,
    handler: async (session, request, reply) => {
      try {
        const { user } = session;
        // @ts-ignore - Fastify multipart request type
        const data = await request.file();

        if (!data) {
          return reply.code(400).send({
            error: 'Bad Request',
            message: 'No file provided',
          });
        }

        return await messageService.file(data, user);
      } catch (error) {
        console.error('Error uploading file:', error);
        return reply.code(500).send({
          error: 'Failed to upload file',
          message: getErrorMessage(error),
        });
      }
    },
  },

  list: {
    method: 'get',
    access: 'common',
    schema: schemas.list,
    handler: async (session, request, reply) => {
      try {
        const { user } = session;
        // @ts-ignore - request.query is validated by schema
        const { limit, page } = request.query;

        return await messageService.list({ limit, page }, user);
      } catch (error) {
        console.error('Error listing messages:', error);
        return reply.code(500).send({
          error: 'Failed to list messages',
          message: getErrorMessage(error),
        });
      }
    },
  },

  content: {
    method: 'get',
    access: 'common',
    schema: schemas.content,
    handler: async (session, request, reply) => {
      try {
        const { user } = session;
        const { id } = request.query;

        const result = await messageService.getContent(id, user);

        reply.header('Content-Type', result.mimetype);

        if (result.type === 'file' && result.filename) {
          reply.header(
            'Content-Disposition',
            `inline; filename="${result.filename}"`,
          );
        }

        return reply.send(result.content);
      } catch (error) {
        console.error('Error getting message content:', error);
        const errorMessage = getErrorMessage(error);

        if (errorMessage === 'Message not found') {
          return reply.code(404).send({
            error: 'Not Found',
            message: 'Message not found',
          });
        }

        if (errorMessage === 'Access denied') {
          return reply.code(403).send({
            error: 'Forbidden',
            message: 'Access denied to this message',
          });
        }

        return reply.code(500).send({
          error: 'Failed to get message content',
          message: errorMessage,
        });
      }
    },
  },
});
