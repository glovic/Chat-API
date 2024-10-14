const User = require('../models/User'); // Adjust the path if necessary
const jwt = require('jsonwebtoken');

// Signup function
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save(); // This will handle password hashing if set up in the model

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login function
const login = async (req, res) => {
    const { email, password } = req.body; // Note: Using email and password

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        console.log('User found:', user);
	
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Check password validity
        const isPasswordValid = await user.isValidPassword(password);
        console.log('Password valid:', isPasswordValid); // Debugging log

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate the token
        const token = jwt.sign({ id: user._id }, '06f1fd67cb051ec1d201ffe387abce713a3525f125a043a6750f74646e72aef4', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
	console.error('Error during login:', error); // Log the error    
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

module.exports = {
    signup,
    login,
};

