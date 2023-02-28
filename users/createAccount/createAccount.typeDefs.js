export default `#graphql 
  type Mutation {
    createAccount(
      email: String!, username: String!, 
      firstName: String!, lastName: String, password: String!, bio: String
    ): MutationResponse!
  }
`;
