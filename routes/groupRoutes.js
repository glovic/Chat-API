const express = require('express');
const Group = require('../models/Group');
const authenticate = require('../middleware/authenticate'); // JWT middleware to protect routes
const router = express.Router();

// Create a new group
router.post('/create', authenticate, async (req, res) => {
    const { name, members } = req.body; // `members` is an array of user IDs
    try {
        const newGroup = new Group({ name, members });
        await newGroup.save();
        res.status(201).json({ message: 'Group created successfully', group: newGroup });
    } catch (error) {
        res.status(500).json({ message: 'Error creating group', error });
    }
});

// Send a message to a group
router.post('/:groupId/message', authenticate, async (req, res) => {
    const { message } = req.body;
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        const newMessage = {
            sender: req.user.id, // Assuming you are using `req.user.id` from authentication middleware
            message
        };
        group.messages.push(newMessage);
        await group.save();

        // Emit the message to all group members via Socket.io
        io.to(groupId).emit('receiveGroupMessage', newMessage);

        res.status(200).json({ message: 'Message sent to group' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
});

// Get all messages from a group
router.get('/:groupId/messages', authenticate, async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId).populate('messages.sender', 'username');
        if (!group) return res.status(404).json({ message: 'Group not found' });

        res.status(200).json(group.messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching group messages', error });
    }
});

module.exports = router;

