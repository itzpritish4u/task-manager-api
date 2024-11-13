import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// User Registration Route
router.post('/register', register);

// User Login Route
router.post('/login', login);

export default router;
