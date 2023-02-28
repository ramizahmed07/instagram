export default `#graphql 
  type Mutation {
    createComment(id: Int!, text: String!): MutationResponse!
  }
`;
