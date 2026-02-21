import { UserModel } from './../models/user.model';
import { PostModel } from './../models/post.model';
import type DataLoader from 'dataloader';
import { PostsApi } from '../graphql/post/datasources';

// src/types/context.ts
export interface CustomContext {
  getUsers: (path?: string) => Promise<Response>;
  getPosts: (path?: string) => Promise<Response>;
  userDataLoader: DataLoader<string, UserModel>;
  postDataLoader: DataLoader<string, PostModel[]>;
  dataSources: {
    postsApi: PostsApi;
  };
}
