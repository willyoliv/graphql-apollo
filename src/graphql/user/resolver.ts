import { cleanUrlFilterParams } from '../../utils/cleanUrlFilterParams';
import type {
  QueryResolvers,
  Resolvers,
  UserResolvers,
} from '../../generated/graphql';

const users: QueryResolvers['users'] = async (
  _,
  { filters },
  { dataSources },
) => {
  const cleanFilters = cleanUrlFilterParams(filters);
  const apiFiltersInput = new URLSearchParams(cleanFilters);
  const users = await dataSources.usersApi.getUsers(apiFiltersInput);
  return users;
};

const user: QueryResolvers['user'] = async (_, { id }, { dataSources }) => {
  const user = dataSources.usersApi.getUser(id);
  return user;
};

const posts: UserResolvers['posts'] = async (
  parent,
  _args,
  { dataSources },
) => {
  return dataSources.postsApi.batchLoadByUserId(parent.id);
};

export const userResolvers: Resolvers = {
  Query: {
    user,
    users,
  },
  User: {
    posts,
  },
};
