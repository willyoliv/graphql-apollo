import { UsersApi } from './../graphql/user/datasources';
import { PostsApi } from './../graphql/post/datasources';
import { CustomContext } from 'types';

export const context = async (): Promise<CustomContext> => {
  return {
    dataSources: {
      usersApi: new UsersApi(),
      postsApi: new PostsApi(),
    },
  };
};
