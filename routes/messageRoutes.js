const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/message', async (req, res) => {
  const { senderId, receiverId, messageText } = req.body;

  try {
    const message = new Message({ senderId, receiverId, messageText });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
});

module.exports = router;

