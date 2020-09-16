const express = require('express');
const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');
const lessons = require('../models/dbHelpers');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: '/' });
});
app.use('/api/lessons', lessonsRouter);
app.use('/api/messages', messagesRouter);
module.exports = app;
