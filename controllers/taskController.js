import Task from '../models/Task.js';

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, priority, dueDate, status } = req.body;

  try {
    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      userId: req.user.userId,  // req.user is set by authMiddleware
    });
    res.status(201).json({ message: 'Task created', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Retrieve all tasks for the logged-in user with optional filters
export const getTasks = async (req, res) => {
  const { priority, status, dueDate, sortBy, order } = req.query;
  const whereClause = { userId: req.user.userId };

  if (priority) whereClause.priority = priority;
  if (status) whereClause.status = status;
  if (dueDate) whereClause.dueDate = dueDate;

  try {
    const tasks = await Task.findAll({
      where: whereClause,
      order: [[sortBy || 'dueDate', order || 'ASC']],
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, status } = req.body;

  try {
    const task = await Task.findOne({ where: { id, userId: req.user.userId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    await task.save();
    res.json({ message: 'Task updated', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ where: { id, userId: req.user.userId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
