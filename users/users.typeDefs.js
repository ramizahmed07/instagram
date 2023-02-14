export default `#graphql
  type User { 
    id: Int!
    email: String!
    username: String!
    firstName: String!
    lastName: String
    createdAt: String!
    updatedAt: String
  }
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    createAccount(email: String!, username: String!, firstName: String!, lastName: String, password: String!): User
    login(username: String!, password: String!):  LoginResult!
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
