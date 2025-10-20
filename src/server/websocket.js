/** @typedef {import('./types').initWebSocket} initWebSocket */

const connections = new Set();

/**
 * @param {object} message
 */
const broadcast = (message) => {
  const messageStr = JSON.stringify(message);
  for (const socket of connections) {
    if (socket.readyState === 1) {
      socket.send(messageStr);
    }
  }
};

/** @type {initWebSocket} */
export const init = ({ server, services }) => {
  server.get('/chat', { websocket: true }, async (socket, request) => {
    try {
      const authHeader = request.headers.authorization;
      console.log(authHeader);
      if (!authHeader) {
        socket.close(1008, 'Authentication required');
        return;
      }
      const session = await services.auth.verify(authHeader, 'common');
      const { user } = session;

      connections.add(socket);
      console.log(
        `User ${user.username} connected. Total connections: ${connections.size}`,
      );

      socket.send(
        JSON.stringify({
          type: 'system',
          message: `Welcome ${user.username}! You are now connected to the chat.`,
        }),
      );

      socket.on('message', async (/** @type {Buffer} */ data) => {
        try {
          const message = JSON.parse(data.toString());

          if (message.type === 'text' && message.text) {
            const savedMessage = await services.message.text(
              message.text,
              user,
            );

            broadcast(savedMessage);
          } else if (message.type === 'ping') {
            socket.send(JSON.stringify({ type: 'pong' }));
          }
        } catch (error) {
          console.error('Error processing message:', error);
          socket.send(
            JSON.stringify({
              type: 'error',
              message: 'Failed to process message',
            }),
          );
        }
      });

      socket.on('close', () => {
        connections.delete(socket);
        console.log(
          `User ${user.username} disconnected. Total connections: ${connections.size}`,
        );
      });

      socket.on('error', (/** @type {Error} */ error) => {
        console.error('WebSocket error:', error);
        connections.delete(socket);
      });
    } catch (error) {
      console.error('WebSocket authentication error:', error);
      socket.close(1008, 'Authentication failed');
    }
  });
};
