import { Pool } from 'pg';
import type { MessageFiles } from '../../entities/message-files.d.ts';

export class MessageFilesRepo {
  create: (
    messageFiles: Omit<MessageFiles, 'id' | 'createdAt'>,
  ) => Promise<MessageFiles>;
}

export function init(pool: Pool): MessageFilesRepo;
