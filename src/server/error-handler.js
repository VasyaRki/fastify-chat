/**
 * @param {any} error
 * @param {import('fastify/types/request').FastifyRequest} request
 * @param {import('fastify/types/reply').FastifyReply} reply
 * @returns {unknown}
 */
export const errorHandler = (error, request, reply) => {
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    path: request.url,
    method: request.method,
  });

  if (error.validation) {
    return reply.code(400).send({
      error: 'Validation Error',
      message: error.message,
      details: error.validation,
    });
  }

  if (error.statusCode === 401 || error.message?.includes('Unauthorized')) {
    return reply.code(401).send({
      error: 'Unauthorized',
      message: error.message || 'Authentication required',
    });
  }

  if (error.statusCode === 403 || error.message?.includes('Forbidden')) {
    return reply.code(403).send({
      error: 'Forbidden',
      message: error.message || 'Access denied',
    });
  }

  if (error.statusCode === 404 || error.message?.includes('not found')) {
    return reply.code(404).send({
      error: 'Not Found',
      message: error.message || 'Resource not found',
    });
  }

  if (error.statusCode && error.statusCode >= 400 && error.statusCode < 600) {
    return reply.code(error.statusCode).send({
      error: error.name || 'Error',
      message: error.message,
    });
  }

  return reply.code(500).send({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  });
};
