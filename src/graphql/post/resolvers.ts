import { cleanUrlFilterParams } from '../../utils/cleanUrlFilterParams';
import type { Post, Resolvers } from '../../generated/graphql';

type QueryTypes = Required<Resolvers>['Query'];

const posts: QueryTypes['posts'] = async (_, { filters }, { getPosts }) => {
  const cleanFilters = cleanUrlFilterParams(filters);
  const apiFiltersInput = new URLSearchParams(cleanFilters);
  const posts = await getPosts('/?' + apiFiltersInput);
  return posts.json();
};

const post: QueryTypes['post'] = async (_, { id }, { getPosts }) => {
  const response = await getPosts('/' + id);
  const post = await response.json();
  return post;
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
  Post: {
    unixTimestamp: ({ createdAt }: Post) => {
      const timestamp = new Date(createdAt).getTime() / 1000;
      return Math.floor(timestamp);
    },
  },
};
