require("dotenv").config();
import * as express from "express";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import client from "./client";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import * as http from "http";

const PORT = process.env.PORT;
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        client,
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }: { token?: String }) => {
      if (!token) {
        throw new Error("You can not listen.");
      }
      const loggedInUser = await getUser(token);
      return loggedInUser;
    },
  },
});

const app = express();
app.use(logger("dev"));
app.use("/static", express.static("uploads"));
server.applyMiddleware({ app });

const httpsServer = http.createServer(app);
server.installSubscriptionHandlers(httpsServer);

httpsServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
