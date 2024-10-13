// routes/groups.js
const express = require('express');
const Group = require('../models/Group');
const router = express.Router();

// Create Group
router.post('/create', async (req, res) => {
  const { name, members } = req.body;
  const group = new Group({ name, members });
  await group.save();
  res.status(201).send('Group created');
});

// Add/Remove Members (and more logic)

