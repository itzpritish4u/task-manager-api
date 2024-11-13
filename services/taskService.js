import Task from '../models/Task.js';

// Create a new task
export async function createTask(userId, taskData) {
  try {
    const task = await Task.create({ ...taskData, userId });
    return task;
  } catch (error) {
    throw new Error('Task creation failed.');
  }
}

// Retrieve all tasks for a user with optional filtering and sorting
export async function getUserTasks(userId, filters = {}) {
  try {
    const tasks = await Task.findAll({
      where: { userId, ...filters },
      order: [['dueDate', 'ASC']],
    });
    return tasks;
  } catch (error) {
    throw new Error('Failed to retrieve tasks.');
  }
}

// Update a task by ID
export async function updateTask(userId, taskId, updates) {
  try {
    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      throw new Error('Task not found or unauthorized.');
    }
    await task.update(updates);
    return task;
  } catch (error) {
    throw new Error('Task update failed.');
  }
}

// Delete a task by ID
export async function deleteTask(userId, taskId) {
  try {
    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      throw new Error('Task not found or unauthorized.');
    }
    await task.destroy();
    return { message: 'Task deleted successfully' };
  } catch (error) {
    throw new Error('Task deletion failed.');
  }
}
