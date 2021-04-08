require('dotenv').config({ path: './.env.local' })
const { ApolloServer, gql } = require('apollo-server-express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const merge = require('lodash').merge
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const context = require('./functions/context')
const Task = require('./typeDefs/task')
const User = require('./typeDefs/user')
const TaskResolvers = require('./resolvers/task')
const UserResolvers = require('./resolvers/user')

const app = express()
app.use(cookieParser())

const typeDefs = /* GraphQL */ gql`
    type Mutation {
        createTask(task: TaskInput!): Task!
        # createUser(user: UserInput!): Boolean!
        updateTask(_id: String!, task: TaskInput!): Task!
    }
    type Query {
        readTasks: [Task!]
        # readUsers: Boolean!
    }
`

const server = new ApolloServer({
    typeDefs: [ typeDefs, Task ],
    resolvers: merge(TaskResolvers),
    context,
    introspection: true,
    playground: true,  
})

server.applyMiddleware({
    app,
    cors: {
        origin: ['http://localhost:3000', 'https://next-tasks-typescript.vercel.app/'],
        credentials: true,
    }
})

const port = process.env.PORT || 8080
app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
)
