export default `#graphql 
  type Query {
    searchPosts(keyword: String!): [Post]
  }
`;
