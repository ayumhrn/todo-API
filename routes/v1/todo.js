var express = require('express');
var router = express.Router();
var todoController = require('../../controllers/todoController');

router.route('/')
    .get(todoController.getall)
    .post(todoController.add)

router.route('/:id')
    .get(todoController.getbyId)
    .put(todoController.updatebyId)
    .delete(todoController.deletebyId)

module.exports = router;