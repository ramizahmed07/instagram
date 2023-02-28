export default `#graphql 
 type CreateCommentResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createComment(id: Int!, text: String!): CreateCommentResult!
  }
`;
