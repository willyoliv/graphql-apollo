import { cleanUrlFilterParams } from '../../utils/cleanUrlFilterParams';
import type { QueryResolvers, Resolvers } from '../../generated/graphql';

const users: QueryResolvers['users'] = async (_, { filters }, { getUsers }) => {
  const cleanFilters = cleanUrlFilterParams(filters);
  const apiFiltersInput = new URLSearchParams(cleanFilters);
  const users = await getUsers('/?' + apiFiltersInput);
  return users.json();
};

const user: QueryResolvers['user'] = async (_, { id }, { getUsers }) => {
  const response = await getUsers('/' + id);
  const user = await response.json();
  return user;
};

export const userResolvers: Resolvers = {
  Query: {
    user,
    users,
  },
};
