// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  number: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
