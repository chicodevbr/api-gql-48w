const { ApolloServer, gql } = require('apollo-server');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers');
const db = require('./db');
require('./db/start');

const Users = require('./data-sources/user');
const { getUserId } = require('./helpers/functions');

const schemaPath = './schema/index.graphql';

const server = new ApolloServer({
  typeDefs: importSchema(schemaPath),
  resolvers,
  playground: true,
  tracing: true,
  context: ({ req }) => {
    return {
      db,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
  dataSources: () => ({
    users: new Users(db.User),
  }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`\u{1F680} Server running on ${url}`);
});
