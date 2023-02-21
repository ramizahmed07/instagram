export default `#graphql
  type UnfollowResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollow(username: String!): UnfollowResult!
  }
`;
