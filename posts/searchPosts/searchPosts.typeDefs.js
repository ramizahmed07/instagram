export default `#graphql 
  type Query {
    searchPosts(keyword: String!, page: Int!): [Post]
  }
`;
