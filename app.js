import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Error Handling Middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync the database schema with models (for development only)
    await sequelize.sync({ alter: true });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
