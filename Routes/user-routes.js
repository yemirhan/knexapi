const express = require('express');
const users = require('../models/dbHelpers');
const bcrypt = require('bcryptjs');

const router = express.Router();
router.get('/', (req, res) => {
  users
    .findAllUsers()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ message: `${err}` }));
});
router.post('/register', (req, res) => {
  const crediential = req.body;
  if (!crediential.username || !crediential.password) {
    res.status(400).json({ message: 'Username and Password required' });
  }
  const hash = bcrypt.hashSync(crediential.password, 12);
  crediential.password = hash;
  users
    .addUser(crediential)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.errno === 19) {
        res.status(400).json({ message: 'Username already taken' });
      }
      res.status(500).json({ message: 'cannot add user' });
    });
});
router.get('/:username', (req, res) => {
  const { username } = req.params;
  users
    .findUserByUsername(username)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: `user with username ${username} does not exists` });
      }
    })
    .catch((err) => res.status(500).json({ message: `${err}` }));
});
router.post('/login', (req, res) => {
  const crediential = req.body;
  if (!crediential.username || !crediential.password) {
    res.status(400).json({ message: 'Username and Password required' });
  }
  users
    .findUserByUsername(crediential.username)
    .then((user) => {
      if (user && bcrypt.compareSync(crediential.password, user.password)) {
        res.status(200).json({ message: `welcome user ${user.username}` });
      } else {
        res.status(401).json({ message: 'invalid credientials' });
      }
    })
    .catch((err) => res.status(500).json({ message: `${err}` }));
});
module.exports = router;
