const User = require('../models/User');

// Add a friend
const addFriend = async (req, res) => {
  const { friendEmail } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const friend = await User.findOne({ email: friendEmail });

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    // Check if they are already friends
    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ message: 'Friend already added' });
    }

    user.friends.push(friend._id);
    await user.save();

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding friend' });
  }
};

// Remove a friend
const removeFriend = async (req, res) => {
  const { friendEmail } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const friend = await User.findOne({ email: friendEmail });

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    // Remove the friend from the user's friends list
    user.friends.pull(friend._id);
    await user.save();

    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing friend' });
  }
};

module.exports = {
  addFriend,
  removeFriend
};

