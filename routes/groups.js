const express = require('express');
const Group = require('../models/Group'); // Adjust path to Group model
const User = require('../models/User'); // Adjust path to User model
const authenticateToken = require('../middleware/authenticate'); // JWT middleware
const router = express.Router();

// Create a new group
router.post('/groups/create', authenticateToken, async (req, res) => {
    const { name, participants } = req.body;

    try {
        const group = new Group({ name, participants: [req.user.id, ...participants] });
        await group.save();
        res.status(201).json({ message: 'Group created successfully', group });
    } catch (error) {
        res.status(500).json({ message: 'Error creating group' });
    }
});

// Add a participant to the group
router.post('/groups/:groupId/add', authenticateToken, async (req, res) => {
    const { groupId } = req.params;
    const { participantId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (!group.participants.includes(participantId)) {
            group.participants.push(participantId);
            await group.save();
            res.json({ message: 'Participant added', group });
        } else {
            res.status(400).json({ message: 'Participant already in group' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding participant' });
    }
});

// Remove a participant from the group
router.post('/groups/:groupId/remove', authenticateToken, async (req, res) => {
    const { groupId } = req.params;
    const { participantId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        group.participants = group.participants.filter(p => p.toString() !== participantId);
        await group.save();
        res.json({ message: 'Participant removed', group });
    } catch (error) {
        res.status(500).json({ message: 'Error removing participant' });
    }
});

// Send a message in the group
router.post('/groups/:groupId/message', authenticateToken, async (req, res) => {
    const { groupId } = req.params;
    const { content } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        group.messages.push({ sender: req.user.id, content });
        await group.save();
        res.json({ message: 'Message sent', group });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message' });
    }
});

module.exports = router;

