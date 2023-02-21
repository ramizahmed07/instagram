export default `#graphql
  type FollowUserResult {
      ok: Boolean!
      error: String
  }
  type Mutation {
    follow(username: String!): FollowUserResult!
  }
`;
