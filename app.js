const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const tasks = require('./routes/tasks');
const auth = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./config/logger');

const app = express();

app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/tasks', tasks);

app.use(errorHandler);



app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
