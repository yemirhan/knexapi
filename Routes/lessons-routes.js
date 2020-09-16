const express = require('express');
const lessons = require('../models/dbHelpers');

const router = express.Router();
router.post('/', (req, res) => {
  lessons
    .add(req.body)
    .then((lesson) => {
      res.status(200).json(lesson);
    })
    .catch((err) => {
      res.status(500).json({ message: 'cannot add lesson' });
    });
});
router.get('/', (req, res) => {
  lessons
    .find()
    .then((lesson) => res.status(200).json(lesson))
    .catch((err) => res.status(500).json({ message: 'cannot add lesson' }));
});
router.get('/:id', (req, res) => {
  lessons
    .findById(req.params.id)
    .then((lesson) => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res.status(404).json({ message: 'unable to find lesson' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'cannot add lesson' }));
});
router.delete('/:id', (req, res) => {
  lessons
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: 'succesfully deleted' });
      } else {
        res.status(404).json({ message: 'unable to find lesson' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'cannot add lesson' }));
});
router.patch('/:id', (req, res) => {
  lessons
    .update(req.params.id, req.body)
    .then((lesson) => {
      if (lesson) {
        res.status(200).json(lesson);
      } else {
        res.status(404).json({ message: 'unable to find lesson' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'cannot add lesson' }));
});

router.post('/:id/messages', (req, res) => {
  const { id } = req.params;
  const msg = req.body;
  if (!msg.lesson_id) {
    msg['lesson_id'] = parseInt(id, 10);
  }

  lessons
    .findById(id)
    .then((lesson) => {
      if (!lesson) {
        res.status(404).json({ message: 'Invalid ID' });
      }
      if (!msg.sender || !msg.text) {
        res.status(400).json({ message: 'Requires both sender and text' });
      }
      lessons
        .addMessage(msg, id)
        .then((message) => {
          if (message) {
            res.status(200).json(message);
          }
        })
        .catch((err) =>
          res.status(404).json({ message: 'failed to add message' })
        );
    })
    .catch((err) => res.status(500).json({ message: 'unable to find lesson' }));
});
router.get('/:id/messages', (req, res) => {
  const { id } = req.params;
  lessons
    .findLessonMessages(id)
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((err) =>
      res.status(500).json({ message: 'unable to retrieve messages' })
    );
});

module.exports = router;
