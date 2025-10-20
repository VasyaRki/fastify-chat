import { Pool } from 'pg';
import type { File } from '../../entities/file.d.ts';

export class FileRepo {
  create: (file: Omit<File, 'id'>) => Promise<File>;
}

export function init(pool: Pool): FileRepo;
