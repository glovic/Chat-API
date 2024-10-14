// routes/friendRoutes.js
const express = require('express');
const router = express.Router();
const { addFriend, removeFriend } = require('../controllers/friendController');
const authenticate = require('../middleware/authenticate'); // Your auth middleware

// POST /friends/add
router.post('/add', authenticate, addFriend);

// POST /friends/remove
router.post('/remove', authenticate, removeFriend);

// Add a friend route
router.post('/friends/add', authenticate, addFriend);

// Remove a friend route
router.post('/friends/remove', authenticate, removeFriend);

module.exports = router;

