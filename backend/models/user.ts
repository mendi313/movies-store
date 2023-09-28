import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  sessionTimeOut: Number; // New field for userId
  createdAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    minLength: [6, 'Your name must be longer than 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [6, 'Your password must be longer than 6 characters'],
    select: false,
  },
  sessionTimeOut: {
    type: Number,
    default: 30000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema, 'User');

export default User;
