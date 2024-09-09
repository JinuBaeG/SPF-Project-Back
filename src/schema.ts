import fg from 'fast-glob';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';

// 현재 파일의 경로를 가져오기 위한 코드 (ESM 환경)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 파일을 동적으로 로드하는 함수 (fast-glob 사용)
const loadFiles = async (pattern: string) => {
  const paths = await fg(pattern);
  return paths.map((path) => readFileSync(path, 'utf-8'));
};

// 동적으로 리졸버를 가져오는 함수
const loadResolvers = async (pattern: string) => {
  const paths = await fg(pattern);
  const resolvers = await Promise.all(
    paths.map(async (path) => {
      const module = await import(path);  // ESM 모듈을 동적으로 import
      return module.default || module;
    })
  );
  return mergeResolvers(resolvers);
};

// 기본 Query 타입 정의 (루트 쿼리 문제 해결용)
const baseTypeDefs = gql`
  type Query {
    _dummy: String
  }
`;

// TypeDefs와 Resolvers를 로드하고 병합하는 함수
const loadTypeDefsAndResolvers = async () => {
  const typesArray = await loadFiles(`${__dirname}/**/*.typeDefs.{js,ts}`);
  const resolvers = await loadResolvers(`${__dirname}/**/*.resolvers.{js,ts}`);

  const typeDefs = mergeTypeDefs([baseTypeDefs, ...typesArray]);  // 기본 Query 추가
  return { typeDefs, resolvers };
};

// 스키마를 생성하는 함수
export const loadSchema = async () => {
  const { typeDefs, resolvers } = await loadTypeDefsAndResolvers();
  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
};
