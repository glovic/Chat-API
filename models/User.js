// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const User = require('./models/User');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// Password hash middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check if the password is valid
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', userSchema);

