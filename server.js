const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groups'); // Import group routes
const User = require('./models/User'); // Import the User model
const authenticate = require('./middleware/authenticate'); // Middleware for JWT authentication
const http = require('http'); // Required to set up server with socket.io
const socketIo = require('socket.io'); // Import socket.io

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Initialize Socket.io on the server
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve the frontend (index.html) from the 'public' directory
app.use(express.static('public'));

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://chatapi:admin@cluster0.eb6m9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Socket.io real-time communication
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle receiving a message from a client
    socket.on('sendMessage', (messageData) => {
        // Broadcast the message to all connected clients
        io.emit('receiveMessage', messageData);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Middleware for protecting routes
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    if (!token) return res.sendStatus(401); // No token provided

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user; // Attach user info to request
        next(); // Proceed to the next middleware or route
    });
};

// Friend Management - Add Friend
app.post('/friends/add', authenticateToken, async (req, res) => {
    const { friendEmail } = req.body;

    try {
        // Find the user making the request
        const user = await User.findById(req.user.id);
        const friend = await User.findOne({ email: friendEmail });

        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        if (!user.friends.includes(friend._id)) {
            user.friends.push(friend._id);
            await user.save();
            res.json({ message: 'Friend added successfully' });
        } else {
            res.status(400).json({ message: 'Friend already added' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding friend' });
    }
});

// Friend Management - Remove Friend
app.post('/friends/remove', authenticateToken, async (req, res) => {
    const { friendEmail } = req.body;

    try {
        // Find the user and the friend
        const user = await User.findById(req.user.id);
        const friend = await User.findOne({ email: friendEmail });

        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        if (user.friends.includes(friend._id)) {
            // Remove friend
            user.friends = user.friends.filter(id => id.toString() !== friend._id.toString());
            await user.save();
            res.json({ message: 'Friend removed successfully' });
        } else {
            res.status(400).json({ message: 'Friend not in the list' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error removing friend' });
    }
});

// Register message routes
app.use('/messages', messageRoutes);
app.use('/api', groupRoutes);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

