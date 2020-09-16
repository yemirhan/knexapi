const express = require('express');
const lessons = require('../models/dbHelpers');

const router = express.Router();

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  lessons
    .removeMessage(id)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: `message with id ${id} deleted` });
      } else {
        res.status(404).json({ message: `no message with id ${id}` });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: 'unable to retrieve messages' })
    );
});

module.exports = router;
