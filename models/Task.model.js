const mongoose = require('mongoose')

const TaskM = mongoose.model('Task', {
    createdAt: {
        default: new Date().valueOf(),
        type: Number
    },
    // createdBy: mongoose.Schema.Types.ObjectId,
    description: String,
    dueAt: Number,
    flagged: Boolean,
    order: Number,
    title: {
        required: true,
        type: String
    }
})

module.exports = TaskM