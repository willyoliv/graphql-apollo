import { gql } from 'graphql-tag';

const rootTypeDefs = gql`
  type Query {
    hi: String
  }
`;

const rootResolvers = {
  Query: {
    hi: () => 'Olá mundo',
  },
};

export const typeDefs = [rootTypeDefs];
export const resolvers = [rootResolvers];
