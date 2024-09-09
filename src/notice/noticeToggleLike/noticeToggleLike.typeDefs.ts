import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    noticeToggleLike(id: String!): MutationResponse!
  }
`;
