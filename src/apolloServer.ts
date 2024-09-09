import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { loadSchema } from "./schema";
import { getUser } from "./utils";
import { pubsub } from "./pubsub";
import { createServer } from "http";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";

// HTTP 서버 생성
const httpServer = createServer();

// WebSocket 서버 생성
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// 스키마를 로드한 후 서버를 시작하는 함수
export const startApolloServer = async () => {
  // 비동기 함수로 스키마를 로드
  const schema = await loadSchema();

  // WebSocket용 서버 설정
  useServer(
    {
      schema,
      context: async (ctx) => {
        const { token } = ctx.connectionParams || {};
        if (token) {
          const loggedInUser = await getUser(token as string);
          return { loggedInUser, pubsub };
        }
        return { pubsub };
      },
    },
    wsServer
  );

  // ApolloServer 인스턴스 생성
  const apolloServer = new ApolloServer({
    schema, // 비동기적으로 로드된 스키마 사용
  });

  // ApolloServer 미들웨어 생성 및 시작
  await apolloServer.start();

  // GraphQL 미들웨어 설정
  const graphqlMiddleware = expressMiddleware(apolloServer, {
    context: async ({ req }: ExpressContextFunctionArgument) => {
      const token = req.headers.authorization || "";
      const loggedInUser = await getUser(token);
      return { loggedInUser, pubsub };
    },
  });

  return { graphqlMiddleware, httpServer };
};
