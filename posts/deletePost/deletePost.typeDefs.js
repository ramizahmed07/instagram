export default `#graphql 
  type DeletePostResult { 
    ok: Boolean!
    error: String
  }
  type Mutation {
    deletePost(id: Int!): DeletePostResult!
  }
`;
