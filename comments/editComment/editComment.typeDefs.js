export default `#graphql 
 type EditCommentResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editComment(id: Int!, text: String!): EditCommentResult!
  }
`;
