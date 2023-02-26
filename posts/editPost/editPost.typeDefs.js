export default `#graphql 
  type EditPhotoResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editPost(id: Int!, caption: String!): EditPhotoResult!
  }
`;
