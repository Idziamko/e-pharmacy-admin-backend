import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    throw createHttpError(401, 'Not authorized');
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw createHttpError(401, 'Token is invalid or expired');
  }

  const user = await User.findById(payload.id);
  if (!user || user.token !== token) {
    throw createHttpError(401, 'Not authorized');
  }

  req.user = user;
  next();
};
