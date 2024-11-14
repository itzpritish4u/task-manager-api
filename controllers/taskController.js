const { Task } = require('../models');
const { Op } = require('sequelize');
const logger = require('../config/logger');

exports.getTasks = async (req, res) => {
  try {
    const { priority, status, startDate, endDate, sortBy, order } = req.query;

    const where = { userId: req.user.id };
    if (priority) where.priority = priority;
    if (status) where.status = status;
    if (startDate && endDate) where.dueDate = { [Op.between]: [startDate, endDate] };

    const orderBy = [];
    if (sortBy) {
      orderBy.push([sortBy, order === 'desc' ? 'DESC' : 'ASC']);
    }

    const tasks = await Task.findAll({ where, order: orderBy });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      userId: req.user.id,
    });

    logger.info(`Task created: ${task.title} by user ID: ${req.user.id}`);
    res.status(201).json(task);
  } catch (err) {
    logger.error(`Task creation error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate, status } = req.body;

    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task){
      logger.warn(`Task not found: ID ${id} for user ID: ${req.user.id}`);
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    await task.save();
    logger.info(`Task updated: ${task.title} by user ID: ${req.user.id}`);

    res.status(200).json(task);
  } catch (err) {
    logger.error(`Task update error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task){
      logger.warn(`Task not found for deletion: ID ${id} for user ID: ${req.user.id}`);
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    logger.info(`Task deleted: ${task.title} by user ID: ${req.user.id}`);
    res.status(204).json({ message: 'Task deleted successfully' });
  } catch (err) {
    logger.error(`Task deletion error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
