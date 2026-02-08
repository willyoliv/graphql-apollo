import type { Resolvers } from '../../generated/graphql';

type QueryTypes = Required<Resolvers>['Query'];

const users: QueryTypes['users'] = async (_, __, context) => {
  console.log(context.hello);
  const users = await fetch('http://localhost:3000/users');
  return users.json();
};

const user: QueryTypes['user'] = () => {
  return {
    id: '1',
    userName: 'Willy.Oliveira',
    firstName: 'Willy',
    lastName: 'Oliveira',
    indexRef: 1,
    createdAt: '',
  };
};

export const userResolvers: QueryTypes = {
  Query: {
    user,
    users,
  },
};
