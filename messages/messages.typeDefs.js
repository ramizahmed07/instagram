export default `#graphql 
  type Message {
    id: Int!
    text: String!
    user: User!
    room: Room!
    createdAt: String!
    updatedAt: String!
  }

  type Room {
    id: Int!
    unreadTotal: Int!
    messages: [Message]
    users: [User]
    createdAt: String!
    updatedAt: String!
  }
`;
