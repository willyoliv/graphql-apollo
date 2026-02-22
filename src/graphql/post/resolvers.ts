import { cleanUrlFilterParams } from '../../utils/cleanUrlFilterParams';
import type {
  Resolvers,
  QueryResolvers,
  PostResolvers,
} from '../../generated/graphql';

const posts: QueryResolvers['posts'] = async (
  _,
  { filters },
  { dataSources },
) => {
  const cleanFilters = cleanUrlFilterParams(filters);
  const apiFiltersInput = new URLSearchParams(cleanFilters);
  const posts = dataSources.postsApi.getPosts(apiFiltersInput);
  return posts;
};

const post: QueryResolvers['post'] = async (_, { id }, { dataSources }) => {
  const post = dataSources.postsApi.getPost(id);
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
