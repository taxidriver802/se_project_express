const errorHandler = (err, req, res, next) => {
  console.error(err.message); // Log full error object

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;
