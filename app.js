import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    await sequelize.sync({ alter: true });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
