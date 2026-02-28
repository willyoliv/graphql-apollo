import { cleanUrlFilterParams } from '../../utils/cleanUrlFilterParams';
import type {
  Resolvers,
  QueryResolvers,
  PostResolvers,
  MutationResolvers,
} from '../../generated/graphql';

// Query resolvers
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

// Mutation resolver
const createPost: MutationResolvers['createPost'] = async (
  _,
  args,
  { dataSources },
) => {
  return dataSources.postsApi.createPost(args.data, dataSources);
};

const updatePost: MutationResolvers['updatePost'] = async (
  _,
  { postId, data },
  { dataSources },
) => {
  return dataSources.postsApi.updatePost(postId, data, dataSources);
};

// Field resolvers
const user: PostResolvers['user'] = async (parent, _args, { dataSources }) => {
  return dataSources.usersApi.batchLoadByPostId(parent.userId);
};

export const postResolvers: Resolvers = {
  Query: {
    post,
    posts,
  },
  Mutation: {
    createPost,
    updatePost,
  },
  Post: { user },
};
