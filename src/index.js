import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Query {
    id: ID!
    name: String!
    age: Int!
    average: Float!
    married: Boolean!
    arrayString: [String!]!
  }
`;

const resolvers = {
  Query: {
    id: () => '123ioipas-sadiofasdpoif',
    name: () => 'Samuel',
    age: () => 27,
    average: () => 50.55,
    married: () => true,
    arrayString: () => ['A', 'B'],
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
