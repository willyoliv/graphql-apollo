import type { Resolvers } from '../../generated/graphql';

type QueryTypes = Required<Resolvers>['Query'];

const posts: QueryTypes['posts'] = async (_, __, { getPosts }) => {
  const posts = await getPosts();
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
};
