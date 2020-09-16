const express = require('express');
const users = require('../models/dbHelpers');

const router = express.Router();
router.get('/', (req, res) => {
  users
    .findAllUsers()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ message: `${err}` }));
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

module.exports = router;
