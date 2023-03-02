export default `#graphql 
  type Mutation {
    sendMessage(text: String!, userId: Int!, roomId: Int!): MutationResponse!
  }
`;
