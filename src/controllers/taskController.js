const Task = require('../models/taskModel');
const axios = require('axios');

exports.createTask = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    console.log('Request body:', req.body);
    const userResponse = await axios.get(`${process.env.USER_SERVICE_URL}/api/users/verify/${userId}`);
    console.log('User service response:', userResponse.data);

    if (!userResponse.data.valid) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const task = new Task({ title, description, userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error in createTask:', error.message);
    res.status(500).json({ error: 'Error creating task' });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

exports.getTasksByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user tasks' });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(taskId, { title, description }, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};