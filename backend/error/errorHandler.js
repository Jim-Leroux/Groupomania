const errorHandler = (error, req, res, next) => {
  return res
    .status(error.statusCode || 500)
    .json({ message: error.message, error: error });
};

module.exports = errorHandler;
