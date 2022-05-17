require('dotenv').config();

const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers');

const schemaPath = './schema/index.graphql';

const dbUri = process.env.URI;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbUri, dbOptions)
  .then(() => console.log('\u{1F516} Database connected'))
  .catch((error) => console.log('Database failed: ', error));

const server = new ApolloServer({
  typeDefs: importSchema(schemaPath),
  resolvers,
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`\u{1F680} Server running on ${url}`);
});
