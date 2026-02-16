import type { Resolvers } from '../../generated/graphql';

type QueryTypes = Required<Resolvers>['Query'];

const users: QueryTypes['users'] = async (_, __, { getUsers }) => {
  const users = await getUsers();
  return users.json();
};

const user: QueryTypes['user'] = async (_, { id }, { getUsers }) => {
  const response = await getUsers('/' + id);
  const user = await response.json();
  return user;
};

export const userResolvers: QueryTypes = {
  Query: {
    user,
    users,
  },
};
