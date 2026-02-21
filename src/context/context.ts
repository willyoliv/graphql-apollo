import { makeUserDataLoader } from './../graphql/user/dataloader';
import { makePostDataLoader } from './../graphql/post/dataloader';
import { CustomContext } from 'types';
import { getPosts } from './../utils/getPosts';
import { getUsers } from '../utils/getUsers';

export const context = async (): Promise<CustomContext> => {
  return {
    userDataLoader: makeUserDataLoader(getUsers),
    postDataLoader: makePostDataLoader(getPosts),
    getUsers,
    getPosts,
  };
};
