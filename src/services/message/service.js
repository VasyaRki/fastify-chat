import path from 'path';
import { randomUUID } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('./types.js').init} */
export const init = ({ messageRepo, fileRepo, messageFilesRepo }) => ({
  text: async (text, user) => {
    const created = await messageRepo.create({ text, userId: user.id });

    return created;
  },

  list: async (opts, _) => {
    const limit = opts.limit;
    const offset = (opts.page - 1) * opts.limit;
    const messages = await messageRepo.findManyWithPagination({
      limit,
      offset,
    });

    return { items: messages, total: 1, page: opts.page, limit };
  },

  file: async (data, user) => {
    const ext = data.filename.substring(data.filename.lastIndexOf('.'));
    const filename = randomUUID() + ext;
    const filePath = path.join(__dirname, '../../../uploads/', filename);
    pipeline(data.file, createWriteStream(filePath));

    const file = await fileRepo.create({
      filename,
      url: filePath,
      mimetype: data.mimetype,
    });

    const message = await messageRepo.create({ userId: user.id });
    await messageFilesRepo.create({ fileId: file.id, messageId: message.id });

    return {
      id: message.id,
      text: message.text,
      createdAt: message.createdAt,
      userId: message.userId,
      user: {
        id: user.id,
        username: user.username,
      },
      file: {
        id: file.id,
        url: file.url,
      },
    };
  },

  getContent: async (messageId, user) => {
    const message = await messageRepo.findById(messageId);

    if (!message) {
      throw new Error('Message not found');
    }

    if (message.userId !== user.id) {
      throw new Error('Access denied');
    }

    if (message.text) {
      return {
        type: 'text',
        content: message.text,
        mimetype: 'text/plain',
      };
    }

    if (message.file) {
      const fileContent = await readFile(message.file.url);
      return {
        type: 'file',
        content: fileContent,
        mimetype: message.file.mimetype,
        filename: message.file.filename,
      };
    }

    throw new Error('Message has no content');
  },
});
