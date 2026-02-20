import type DataLoader from 'dataloader';
import { User } from '../generated/graphql';

// src/types/context.ts
export interface CustomContext {
  getUsers: (path?: string) => Promise<Response>;
  getPosts: (path?: string) => Promise<Response>;
  userDataLoader: DataLoader<string, User>;
}
