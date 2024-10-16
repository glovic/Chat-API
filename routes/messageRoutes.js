const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');

// Send a new message
router.post('/', async (req, res) => { // Note that this should be '/' to match /messages/
    const { senderId, receiverId, messageText } = req.body;

    try {
        // Check if senderId and receiverId are friends
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        
        if (!sender || !receiver) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Implement friend check logic if necessary
        // Assuming you have a way to check if they are friends
        // For example, check if receiverId is in sender's friend list
        const isFriend = sender.friends.includes(receiverId); // Adjust according to your model structure
        if (!isFriend) {
            return res.status(403).json({ message: 'You can only message your friends.' });
        }

        // Create and save the message
        const message = new Message({ senderId, receiverId, messageText });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message' });
    }
});

// Retrieve messages between two users
router.get('/:userId1/:userId2', async (req, res) => {
    const { userId1, userId2 } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { senderId: userId1, receiverId: userId2 },
                { senderId: userId2, receiverId: userId1 },
            ],
        }).sort({ createdAt: 1 }); // Sort messages by creation time

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages' });
    }
});

module.exports = router;

