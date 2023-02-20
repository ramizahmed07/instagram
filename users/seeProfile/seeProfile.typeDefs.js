export default `#graphql 
  type User { 
    id: Int!
    email: String!
    username: String!
    firstName: String!
    lastName: String
    createdAt: String!
    updatedAt: String
    bio: String
    avatar: String
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
