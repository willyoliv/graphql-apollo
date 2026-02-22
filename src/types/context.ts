import { UsersApi } from './../graphql/user/datasources';
import { PostsApi } from '../graphql/post/datasources';

// src/types/context.ts
export interface CustomContext {
  dataSources: {
    postsApi: PostsApi;
    usersApi: UsersApi;
  };
}
