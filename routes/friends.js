// routes/friends.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Add Friend
router.post('/add', async (req, res) => {
  const { friendId } = req.body;
  const user = await User.findById(req.userId); // Assuming you have middleware for JWT
  if (!user.friends.includes(friendId)) {
    user.friends.push(friendId);
    await user.save();
  }
  res.status(200).send('Friend added');
});

// Remove Friend
router.post('/remove', async (req, res) => {
  const { friendId } = req.body;
  const user = await User.findById(req.userId);
  user.friends = user.friends.filter(id => id !== friendId);
  await user.save();
  res.status(200).send('Friend removed');
});

module.exports = router;

