import User from './User.js';
import Task from './Task.js';

// Define model associations here
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

export { User, Task };
