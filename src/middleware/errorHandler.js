import { isCelebrateError } from 'celebrate';
import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const details = [...err.details.values()];
    const message = details[0]?.details[0]?.message ?? 'Validation error';
    return res.status(400).json({ status: 400, message });
  }

  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .json({ status: err.status, message: err.message });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ status: 400, message: err.message });
  }

  console.error(err);
  res.status(500).json({ status: 500, message: 'Something went wrong' });
};
