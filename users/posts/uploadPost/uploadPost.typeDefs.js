export default `#graphql 
  type Mutation {
    uploadPost(file: Upload!, caption: String): Post!
  }
`;
