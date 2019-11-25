var mongoose = require('mongoose');
var todo = require('../models/todo');
var { successResponse, errorResponse } = require('../helpers/response');

exports.add = (req, res) => {
    let newtodo = new todo({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status
    });

    newtodo.save()
        .then((todo) => {
            return res.status(200).json(
                successResponse("New todo has been add to your todo", todo)
            )
        })
        .catch((err) => {
            return res.status(406).json(
                errorResponse('Sorry, failed', err, 406)
            )
        })
}

exports.getall = (req, res) => {
    todo.find().exec()
        .then((todo) => {
            return res.status(200).json(successResponse('All list', todo))
        })
}

exports.getbyId = (req, res) => {
    todo.findOne({ _id: req.params.id }).exec()
        .then((todo) => {
            return res.status(200).json(
                successResponse('List todo', todo)
            )
        })
}

exports.updatebyId = (req, res) => {

    todo.updateOne({ _id: req.params.id },
        {
            $set: req.body
        }).exec()
        .then((todo) => {
            return res.status(201).json(
                successResponse('Todo successfully updated!', todo)
            )
        })
        .catch((err) => {
            res.status(406).json(
                errorResponse("failed", err, 406)
            )
        })
}

exports.deletebyId = (req, res) => {

    todo.deleteOne({ _id: req.params.id }).exec()
        .then((todo) => {
            res.status(200).json(
                successResponse('Todo successfully deleted!', todo)
            )
        })
}


