const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ID of the sender
        message: String,
        timestamp: { type: Date, default: Date.now } // Message timestamp
    }]
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);

