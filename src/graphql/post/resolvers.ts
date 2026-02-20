import DataLoader from 'dataloader';
import { cleanUrlFilterParams } from '../../utils/cleanUrlFilterParams';
import type {
  Resolvers,
  QueryResolvers,
  PostResolvers,
  User,
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

const userDataLoader = new DataLoader(async (ids) => {
  const urlQuery = ids.join('&id=');
  const url = 'http://localhost:3000/users/?id=' + urlQuery;
  const response = await fetch(url);
  const users = (await response.json()) as User[];
  return ids.map((id) => users.find((user) => user.id === id) as User);
});

const user: PostResolvers['user'] = async (parent, _args) => {
  return userDataLoader.load(parent.userId);
};

export const postResolvers: Resolvers = {
  Query: {
    post,
    posts,
  },
  Post: { user },
};
