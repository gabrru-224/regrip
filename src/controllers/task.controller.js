const taskService = require('../services/task.service');

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await taskService.createTask(req.user.id, { title, description, status });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.user.id);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updatedTask = await taskService.updateTask(req.user.id, id, { title, description, status });
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(req.user.id, id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
