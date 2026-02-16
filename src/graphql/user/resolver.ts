import { cleanUrlFilterParams } from '../../utils/cleanUrlFilterParams';
import type { Resolvers } from '../../generated/graphql';

type QueryTypes = Required<Resolvers>['Query'];

const users: QueryTypes['users'] = async (_, { filters }, { getUsers }) => {
  const cleanFilters = cleanUrlFilterParams(filters);
  const apiFiltersInput = new URLSearchParams(cleanFilters);
  const users = await getUsers('/?' + apiFiltersInput);
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
