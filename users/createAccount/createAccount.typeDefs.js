export default `#graphql
  type CreateAccountResult { 
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      email: String!, username: String!, 
      firstName: String!, lastName: String, password: String!, bio: String
    ): CreateAccountResult!
  }
`;
