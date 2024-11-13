import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a Task (Protected Route)
router.post('/', authMiddleware, createTask);

// Get All Tasks for User (Protected Route)
router.get('/', authMiddleware, getTasks);

// Update a Task by ID (Protected Route)
router.put('/:id', authMiddleware, updateTask);

// Delete a Task by ID (Protected Route)
router.delete('/:id', authMiddleware, deleteTask);

export default router;
