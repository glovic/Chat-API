const User = require('../models/User');

// Add a friend
const addFriend = async (req, res) => {
    try {
        const userId = req.userId; // Get the user ID from the token
        const { friendId } = req.body;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!friend) {
            return res.status(404).json({ message: "Friend not found." });
        }

        // Check if already friends
        if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: "Already friends." });
        }

        user.friends.push(friendId);
        await user.save();

        res.status(200).json({ message: "Friend added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding friend.", error });
    }
};

// Remove a friend
const removeFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Remove friend logic
        user.friends = user.friends.filter(id => id.toString() !== friendId);
        await user.save();

        res.status(200).json({ message: 'Friend removed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = { 
    addFriend, 
    removeFriend 
};

