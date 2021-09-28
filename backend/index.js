const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const os = require("os");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
require("dotenv").config();

async function startApolloServer() {

  const networkInterfaces = os.networkInterfaces();
  const localHost = networkInterfaces.wlp1s0[0].address;
  const port = process.env.PORT || 4000;

  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });

  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => ({ req }),
  });

  // More required logic for integrating with Express
  await server.start();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port, hostname: localHost }, resolve));
  console.log(`🚀 Server ready at http://${localHost}:4000${server.graphqlPath}`);
}

startApolloServer();




















// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => ({ req }),
// });

// await server.start();

// const app = express();
// app.use(graphqlUploadExpress());
// server.applyMiddleware({ app });

// server
//   .listen({ port: 4000 })
//   .then((res) => console.log(`Server is running on ${res.url}`));
