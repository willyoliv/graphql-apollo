import gql from 'graphql-tag';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): Post!
    posts(filters: ApiFiltersInput): [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    user: User!
    indexRef: Int!
    createdAt: String!
  }
`;
