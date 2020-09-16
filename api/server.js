const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');
const usersRouter = require('../Routes/user-routes');
const authRoutes = require('../auth/auth-routes');
const restricted = require('../auth/restricted-middleware');

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: '/' });
});

app.use('/api/auth', authRoutes);
app.use('/api/lessons', restricted, lessonsRouter);
app.use('/api/messages', restricted, messagesRouter);
app.use('/api/users', restricted, usersRouter);

module.exports = app;
