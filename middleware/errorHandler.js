export default function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.status || 500;
  const message = err.message || 'An unexpected error occurred';

  res.status(statusCode).json({
    success: false,
    message,
  });
}
