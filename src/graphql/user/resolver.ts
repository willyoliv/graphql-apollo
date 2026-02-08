import type { Resolvers } from '../../generated/graphql';

type QueryTypes = Required<Resolvers>['Query'];

const users: QueryTypes['users'] = async (_, __, { fetch }) => {
  const users = await fetch('http://localhost:3000/users');
  return users.json();
};

const user: QueryTypes['user'] = async (_, __, { fetch }) => {
  const user = await fetch('http://localhost:3000/users/602');
  return user.json();
};

export const userResolvers: QueryTypes = {
  Query: {
    user,
    users,
  },
};
