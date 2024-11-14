const express = require('express');
const bodyParser = require('body-parser');
const tasks = require('./routes/tasks');
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/tasks', tasks);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
