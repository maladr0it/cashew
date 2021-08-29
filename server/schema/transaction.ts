import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    transactions: [Transaction!]!
    transaction(id: ID!): Transaction!
  }

  extend type Mutation {
    createTransaction(
      label: String
      amount: Float!
      senderUsername: String!
      receiverUsername: String!
    ): Transaction!
    deleteTransaction(id: ID!): Boolean!
  }

  type Transaction {
    id: ID!
    label: String
    amount: Float!
    sender: User!
    receiver: User!
    date: String!
  }
`;
