const { gql } = require('apollo-server-express');

module.exports.typeDefs = gql`
  type Good {
    id: ID!
    name: String!
    price: Int!
    description: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    user: ID!
    good: ID!
    title: String!
    message: String!
  }

  type Query {
    goods: [Good!]
    users: [User!]
    good(id: ID!): Good!
    user(id: ID!): User!
    posts(user: ID, good: ID): [Post!]
  }

  type Mutation {
    createUser(id: ID!, name: String!, email: String!, age: Int): User!
    updateUser(id: ID!, name: String, email: String, age: Int): User!
    deleteUser(id: ID!): User!

    createGood(id: ID!, name: String!, price: Int!, description: String): Good!
    updateGood(id: ID!, name: String, price: Int, description: String): Good!
    deleteGood(id: ID!): Good!

    addPost(user: ID!, good: ID!, title: String!, message: String!): Post
  }
`;
