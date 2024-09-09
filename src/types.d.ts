import { PrismaClient, User } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";

// Context 타입 정의
export type Context = {
  loggedInUser: User | null;
  client: PrismaClient;
};

// 기본 Resolver 타입
export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: GraphQLResolveInfo
) => any;

// SubscriptionResolver 타입 추가 (subscribe 필드 허용)
export type SubscriptionResolver = {
  subscribe: (
    root: any,
    args: any,
    context: Context,
    info: GraphQLResolveInfo
  ) => AsyncIterator<any> | Promise<AsyncIterator<any>>;
};

// Resolvers 타입 수정 (SubscriptionResolver 포함)
export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver | SubscriptionResolver;
  };
};
