import type { FileRepo } from '../../data/file/types.js';
import type { MessageFilesRepo } from '../../data/message-files/types.js';
import type { MessageRepo, MessageResponse } from '../../data/message/types.js';
import type { Message } from '../../entities/message.js';
import type { User } from '../../entities/user.js';

interface Deps {
  messageRepo: MessageRepo;
  fileRepo: FileRepo;
  messageFilesRepo: MessageFilesRepo;
}

interface PaginatedMessages {
  items: MessageResponse[];
  total: number;
  page: number;
  limit: number;
}

interface MessageContent {
  type: 'text' | 'file';
  content: string | Buffer;
  mimetype: string;
  filename?: string;
}

export interface MessageService {
  text: (text: string, user: User) => Promise<Message>;
  list: (
    opts: { page: number; limit: number },
    user: User,
  ) => Promise<PaginatedMessages>;
  file: (data: any, user: User) => Promise<Message>;
  getContent: (messageId: number, user: User) => Promise<MessageContent>;
}

export function init(deps: Deps): MessageService;
