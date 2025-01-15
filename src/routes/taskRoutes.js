const express = require('express');
const { createTask, getTasks, getTasksByUser, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.get('/user/:userId', getTasksByUser);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;