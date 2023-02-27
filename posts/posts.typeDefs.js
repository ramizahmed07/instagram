export default `#graphql
  type Post {
    id: Int!
    file: String!
    caption: String
    likes: [Like]
    hashtags: [Hashtag]
    user: User!
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!  
    posts(page: Int!): [Post]
    totalPosts: Int
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }
`;
