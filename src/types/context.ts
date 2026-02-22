import { UserModel } from './../models/user.model';
import type DataLoader from 'dataloader';
import { PostsApi } from '../graphql/post/datasources';

// src/types/context.ts
export interface CustomContext {
  getUsers: (path?: string) => Promise<Response>;
  userDataLoader: DataLoader<string, UserModel>;
  dataSources: {
    postsApi: PostsApi;
  };
}
