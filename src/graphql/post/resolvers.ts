import { cleanUrlFilterParams } from '../../utils/cleanUrlFilterParams';
import type {
  Post,
  Resolvers,
  PostResultResolvers,
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

  if (!response.ok) {
    return {
      statusCode: response.status,
      message: 'Post not found',
    };
  }

  const data = await response.json();

  if (!data || !data.id) {
    return {
      statusCode: 404,
      message: 'Post not found',
    };
  }

  return data;
};

const PostResult: PostResultResolvers = {
  __resolveType: (obj) => {
    if ('statusCode' in obj) {
      return 'PostNotFoundError';
    }
    if ('id' in obj) {
      return 'Post';
    }
    return null;
  },
};

const Post: PostResolvers = {
  unixTimestamp: ({ createdAt }) => {
    const timestamp = new Date(createdAt).getTime() / 1000;
    return Math.floor(timestamp).toString();
  },
};

export const postResolvers: Resolvers = {
  Query: {
    post,
    posts,
  },
  Post,
  PostResult,
};
