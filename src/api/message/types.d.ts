import * as SchemaType from 'json-schema-to-ts';
import type { API, ProtectedEndpoint } from '../types.d.ts';
import * as schemas from './schemas.js';
import type { Message } from '../../entities/message.d.ts';
import type {
  MessageService,
  PaginatedMessages,
} from '../../services/message/types.d.ts';
import type { File } from '../../entities/file.js';

type CreateParam = SchemaType.FromSchema<typeof schemas.create>;
type ListParam = SchemaType.FromSchema<typeof schemas.list>;
type FileParam = SchemaType.FromSchema<typeof schemas.file>;

export interface MessageApi extends API {
  create: ProtectedEndpoint<CreateParam, Promise<Message>>;
  list: ProtectedEndpoint<ListParam, Promise<PaginatedMessages>>;
  file: ProtectedEndpoint<FileParam, Promise<File>>;
}

interface Deps {
  messageService: MessageService;
}

export function init(deps: Deps): MessageApi;
