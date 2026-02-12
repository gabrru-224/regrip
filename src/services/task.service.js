const db = require('../config/db');
const Task = db.Task;

exports.createTask = async (userId, taskData) => {
  const task = await Task.create({ ...taskData, userId });
  return task;
};

exports.getTasks = async (userId) => {
  const tasks = await Task.findAll({ where: { userId } });
  return tasks;
};

exports.updateTask = async (userId, taskId, taskData) => {
  const task = await Task.findOne({ where: { id: taskId, userId } });

  if (!task) {
    throw new Error('Task not found or you are not authorized to update it.');
  }

  const updatedTask = await task.update(taskData);
  return updatedTask;
};

exports.deleteTask = async (userId, taskId) => {
  const task = await Task.findOne({ where: { id: taskId, userId } });

  if (!task) {
    throw new Error('Task not found or you are not authorized to delete it.');
  }

  await task.destroy();
};
