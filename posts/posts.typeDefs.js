export default `#graphql
  type Post {
    id: Int!
    file: String!
    caption: String
    createdAt: String!
    updatedAt: String!
    hashtags: [Hashtag]
    user: User!
  }
  type Hashtag {
    id: Int!
    hashtag: String!  
    posts: [Post]
    totalPosts: Int
    createdAt: String!
    updatedAt: String
  }
`;
