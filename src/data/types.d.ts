import type { Pool } from 'pg';
import type { UserRepo } from './user/types.d.ts';
import type { MessageRepo } from './message/types.js';
import type { FileRepo } from './file/types.js';
import type { MessageFilesRepo } from './message-files/types.d.ts';

interface Repos {
  user: UserRepo;
  message: MessageRepo;
  file: FileRepo;
  messageFiles: MessageFilesRepo;
}

export function init(pool: Pool): Repos;
