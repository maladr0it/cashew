import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
    transactions: [Transaction!]
    email: String!
  }
`;
