export default `#graphql 
  type Query {
    seePostComments(id: Int!): [Comment]
  }
`;
