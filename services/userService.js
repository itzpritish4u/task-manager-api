import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register a new user
export async function registerUser(username, email, password) {
  try {
    const user = await User.create({ username, email, password });
    return { id: user.id, username: user.username, email: user.email };
  } catch (error) {
    throw new Error('User registration failed.');
  }
}

// Authenticate a user and generate JWT
export async function authenticateUser(email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password.');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return { token, userId: user.id };
  } catch (error) {
    throw new Error('Authentication failed.');
  }
}
