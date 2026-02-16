import { CustomContext } from 'types';

const API_URL = 'http://localhost:3000';

export const context = async (): Promise<CustomContext> => {
  return {
    getUsers: (path = '/') => fetch(API_URL + '/users' + path),
    getPosts: (path = '/') => fetch(API_URL + '/posts' + path),
  };
};
