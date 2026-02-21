import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  extend type Query {
    user(id: ID!): User!
    users(filters: ApiFiltersInput): [User!]!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    indexRef: Int!
    createdAt: String!
    posts: [Post!]!
  }
`;
