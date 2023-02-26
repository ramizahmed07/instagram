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
    posts: [Post]
    followers: [User],
    following: [User],
    totalFollowing: Int!,
    totalFollowers: Int!,
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
