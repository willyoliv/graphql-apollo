import { cleanUrlFilterParams } from '../../utils/cleanUrlFilterParams';
import type {
  Resolvers,
  QueryResolvers,
  PostResolvers,
} from '../../generated/graphql';

const posts: QueryResolvers['posts'] = async (_, { filters }, { getPosts }) => {
  const cleanFilters = cleanUrlFilterParams(filters);
  const apiFiltersInput = new URLSearchParams(cleanFilters);
  const response = await getPosts('/?' + apiFiltersInput);
  return response.json();
};

const post: QueryResolvers['post'] = async (_, { id }, { getPosts }) => {
  const response = await getPosts('/' + id);
  const post = await response.json();

  return post;
};

const user: PostResolvers['user'] = async (
  parent,
  _args,
  { userDataLoader },
) => {
  return userDataLoader.load(parent.userId);
};

export const postResolvers: Resolvers = {
  Query: {
    post,
    posts,
  },
  Post: { user },
};
