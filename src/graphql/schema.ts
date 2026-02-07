import { gql } from 'graphql-tag';
import { userTypeDefs } from './user/typedefs';
import { userResolvers } from './user/resolver';

const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _empty: () => true,
  },
};

export const typeDefs = [rootTypeDefs, userTypeDefs];
export const resolvers = [rootResolvers, userResolvers];
