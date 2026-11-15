import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (paramName) => (req, res, next) => {
  if (!isValidObjectId(req.params[paramName])) {
    throw createHttpError(400, 'Invalid id');
  }
  next();
};
