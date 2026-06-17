/**
 * *Global error handler middleware
 * *Catches any unhandled errors and sends a standardized JSON response
 */
export const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.stack || err.message || err);

  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong',
  });
};
