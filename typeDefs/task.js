const { gql } = require('apollo-server-express')

const Task = /* GraphQL */ gql`
    input TaskInput {
        _id: ID
        createdAt: Float
        description: String
        dueAt: Float
        flagged: Boolean
        order: Int
        title: String
    }
    type Task {
        _id: ID!
        createdAt: Float!
        # createdBy: ID!
        description: String
        dueAt: Float!
        flagged: Boolean!
        order: Int!
        title: String!
    }
`

module.exports = Task
