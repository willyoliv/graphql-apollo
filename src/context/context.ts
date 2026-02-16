import { CustomContext } from 'types';

export const context = async (): Promise<CustomContext> => {
  return {
    getUsers: (path = '/') => fetch('http://localhost:3000/users' + path),
  };
};
