const handleError = (res, err, status = 500, message = err.message) => {
  res.status(status).send({ message });
};

const handleValidationError = (res, err) => {
  return handleError(res, err, 400, "Invalid data");
};

const handleDocumentNotFoundError = (res, err) => {
  return handleError(res, err, 404, "Item not found");
};

module.exports = {
  handleError,
  handleValidationError,
  handleDocumentNotFoundError,
};
