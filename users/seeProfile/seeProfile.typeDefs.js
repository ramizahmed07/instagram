export default `#graphql 
  type User { 
    id: Int!
    email: String!
    username: String!
    firstName: String!
    lastName: String
    createdAt: String!
    updatedAt: String
    bio: String!
    avatar: String!
    following: [User]!
    followers: [User]!
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
