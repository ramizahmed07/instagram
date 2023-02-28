export default `#graphql 
  type Comment {
    id: Int!
    text: String!
    user:  User!
    post: Post!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
