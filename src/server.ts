import express, { Application } from "express";
import logger from "morgan";
import http from "http";
import cors from "cors";
import { startApolloServer } from "./apolloServer"; // 비동기 함수로 Apollo Server 시작
import { uploadRouter } from "./upload";

const PORT = process.env.PORT || 4000;
const app: Application = express();

// 미들웨어 설정
app.use(logger("dev"));
app.use(cors());
app.use("/static", express.static("uploads"));
app.use("/upload", uploadRouter); // 파일 업로드용 REST API 라우트 추가

// Apollo Server 시작 후 미들웨어 적용
const startServer = async () => {
  const { graphqlMiddleware, httpServer } = await startApolloServer();

  // Apollo Server 미들웨어 설정
  app.use("/graphql", express.json(), graphqlMiddleware);

  // HTTP 서버 실행
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
  });
};

// 서버 시작
startServer();
