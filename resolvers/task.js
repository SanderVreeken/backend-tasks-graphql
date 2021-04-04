const fs = require('fs')
const handlebars = require('handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

const isValid = require('../functions/isValid')
const TaskM = require('../models/Task.model')

const TaskResolvers = {
    Mutation: {
        async createTask(_, { task }) {
            try { 
                const response = await new TaskM(task).save()
                return response
            } catch(error) {
                throw new Error(error)
            }
        }, 
        async updateTask(_, { _id, task }) {
            try { 
                const response = TaskM.findByIdAndUpdate(_id, task, {
                    useFindAndModify: false
                })
                return response
            } catch(error) {
                throw new Error(error)
            }
        }
    },
    Query: {
        async readTasks() {
            try { 
                const tasks = await TaskM.find()
                return tasks
            } catch(error) {
                throw new Error(error)
            }
        }
    }
}

module.exports = TaskResolvers