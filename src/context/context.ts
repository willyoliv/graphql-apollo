import { PostsApi } from './../graphql/post/datasources';
import { makeUserDataLoader } from './../graphql/user/dataloader';
import { CustomContext } from 'types';
import { getUsers } from '../utils/getUsers';

export const context = async (): Promise<CustomContext> => {
  return {
    userDataLoader: makeUserDataLoader(getUsers),
    getUsers,
    dataSources: {
      postsApi: new PostsApi(),
    },
  };
};
