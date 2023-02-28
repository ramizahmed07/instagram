export default `#graphql 
  type SeePostCommentsResult {
    ok: Boolean!
    error: String
  }
  type Query {
    seePostComments(id: Int!): [Comment]
  }
`;
