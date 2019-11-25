var mongoose = require('mongoose');
var Schema = mongoose.Schema

var todoSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, 'it must be have title!']
    },
    description: {
        type: String,
        required: true
    },
    dueDate: Date,
    priority: {
        type: String,
        lowercase: true,
        enum: ['high', 'low']
    },
    status: {
        type: Boolean
    }
})

var todo = mongoose.model('todo', todoSchema);

module.exports = todo;