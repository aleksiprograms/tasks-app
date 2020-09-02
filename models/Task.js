const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: String,
        required: true,
    },
    running: {
        type: Boolean,
        required: true,
    },
    savedElapsedTime: {
        type: Number,
        required: true,
    },
    lastStartTime: {
        type: Number,
        required: true,
    },
});

module.exports = Task = mongoose.model('task', TaskSchema);