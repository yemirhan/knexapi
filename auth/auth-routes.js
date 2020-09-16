const express = require('express');
const users = require('../models/dbHelpers');
const bcrypt = require('bcryptjs');
const generateToken = require('./generateToken');
const router = express.Router();

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

router.post('/login', (req, res) => {
  const crediential = req.body;
  if (!crediential.username || !crediential.password) {
    res.status(400).json({ message: 'Username and Password required' });
  }
  users
    .findUserByUsername(crediential.username)
    .then((user) => {
      if (user && bcrypt.compareSync(crediential.password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `welcome user ${user.username}`, token });
      } else {
        res.status(401).json({ message: 'invalid credientials' });
      }
    })
    .catch((err) => res.status(500).json({ message: `${err}` }));
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({ message: error });
      } else {
        res.status(200).json({ message: 'Succesfully logged out.' });
      }
    });
  } else {
    res.status(200).json({ message: 'Not logged in' });
  }
});
module.exports = router;
