export default `#graphql
  type FollowResult {
      ok: Boolean!
      error: String
  }
  type Mutation {
    follow(username: String!): FollowResult!
  }
`;
