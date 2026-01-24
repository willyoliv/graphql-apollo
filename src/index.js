import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Query {
    user: User!
    users: [User]!
  }

  type User {
    id: ID!
    userName: String!
  }
`;

const resolvers = {
  Query: {
    user: () => {
      return {
        id: 'abcde',
        userName: 'Will',
      };
    },
    users: () => {
      return [
        {
          id: 'abcde',
          userName: 'Will',
        },
        {
          id: 'abcde2',
          userName: 'Will2',
        },
        {
          id: 'abcde3',
          userName: 'Will3',
        },
      ];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4003 },
  });

  console.log(`🚀 Server ready at: ${url}`);
};

start().catch((err) => {
  console.error('Erro ao iniciar o servidor:', err);
});
