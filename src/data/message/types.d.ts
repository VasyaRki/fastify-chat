import type { Pool } from 'pg';
import type { Message } from '../../entities/message.d.ts';

interface MessageResponse {
  id: number;
  text?: string;
  createdAt: Date;
  user: {
    id: number;
    username: string;
  };
  file: {
    id: number;
    url: string;
  };
}

interface MessageWithFile {
  id: number;
  text?: string;
  userId: number;
  createdAt: Date;
  file?: {
    id: number;
    url: string;
    mimetype: string;
    filename: string;
  };
}

export class MessageRepo {
  create: (message: Omit<Message, 'id' | 'createdAt'>) => Promise<Message>;
  findById: (id: number) => Promise<MessageWithFile | null>;
  findManyWithPagination: (opts: {
    limit: number;
    offset: number;
  }) => Promise<MessageResponse[]>;
}

export function init(pg: Pool): MessageRepo;
