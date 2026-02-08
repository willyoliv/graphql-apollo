import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers, typeDefs } from './graphql/schema';
import type { CustomContext } from './types';

const server = new ApolloServer<CustomContext>({
  typeDefs,
  resolvers,
});

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4003 },
    context: async () => ({
      fetch,
    }),
  });

  console.log(`🚀 Server ready at: ${url}`);
};

start().catch((err) => {
  console.error('Erro ao iniciar o servidor:', err);
});
