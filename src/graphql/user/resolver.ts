import type { Resolvers } from '../../generated/graphql';

type QueryTypes = Required<Resolvers>['Query'];

const users: QueryTypes['users'] = async (_, __, { fetch }) => {
  const users = await fetch('http://localhost:3000/users');
  return users.json();
};

const user: QueryTypes['user'] = async (_, { id }, { fetch }) => {
  const response = await fetch('http://localhost:3000/users/' + id);
  const user = await response.json();
  return user;
};

export const userResolvers: QueryTypes = {
  Query: {
    user,
    users,
  },
};
