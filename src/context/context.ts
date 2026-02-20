import { CustomContext } from 'types';
import { getUsers } from '../utils/getUsers';
import { makeUserDataLoader } from '../graphql/user/dataloader';

export const context = async (): Promise<CustomContext> => {
  return {
    userDataLoader: makeUserDataLoader(getUsers),
    getUsers,
    getPosts: (path = '/') => fetch(process.env.API_URL + '/posts' + path),
  };
};
