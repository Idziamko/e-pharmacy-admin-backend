import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '12h',
  });

  user.token = token;
  await user.save();

  res.status(200).json({
    token,
    user: { name: user.name, email: user.email },
  });
};

export const logout = async (req, res) => {
  req.user.token = null;
  await req.user.save();

  res.status(200).json({ message: 'Logout successful' });
};

export const getUserInfo = async (req, res) => {
  const { name, email } = req.user;
  res.status(200).json({ name, email });
};
