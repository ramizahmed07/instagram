export default `#graphql
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    totalPages: Int
  }
  type Query {
    seeFollowing(username: String!, page: Int!): SeeFollowingResult!
  }
`;
