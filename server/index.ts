import "dotenv/config";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import sequelize from "./models";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const app = express();
app.use(cors());
const eraseDatabaseOnSync = true;

async function startApolloServer() {
  try {
    // seed database
    await sequelize.sync({ force: eraseDatabaseOnSync });

    if (eraseDatabaseOnSync) {
      createUsersWithTransactions();
    }

    console.log(`🚀 Database in sync`);

    // start server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { models: sequelize.models },
    });
    await server.start();

    server.applyMiddleware({ app, path: "/graphql" });
    await new Promise<void>((resolve) => app.listen({ port: 9000 }, resolve));
    console.log(
      `🚀 Server ready at http://localhost:9000${server.graphqlPath}`,
    );
  } catch (err) {
    console.log(err);
  }
}

startApolloServer();

const createUsersWithTransactions = async () => {
  const { User, Transaction } = sequelize.models;

  try {
    await User.create(
      {
        username: "koobi",
        password: "password123",
        email: "koobi@gmail.com",
      },
      {
        include: [Transaction],
      },
    );

    await User.create(
      {
        username: "moomoo",
        password: "password123",
        email: "moomoo@gmail.com",
      },
      {
        include: [Transaction],
      },
    );
  } catch (err) {
    console.error(err);
  }
};
