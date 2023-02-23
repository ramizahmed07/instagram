export default `#graphql

  type Post {
    id: Int!
    file: String!
    caption: String
    createdAt: String!
    updatedAt: String!
    hashtag: [Hashtag]
    user: User!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    posts: [Post]
    createdAt: String!
    updatedAt: String
  }

`;
