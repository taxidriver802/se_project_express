const {
  statusBadRequest,
  statusNotFound,
  statusDefault,
} = require("./constants");

const handleError = (
  res,
  err,
  status = statusDefault,
  message = err.message,
) => {
  res.status(status).send({ message });
};

const handleValidationError = (res, err) =>
  handleError(res, err, statusBadRequest, "Invalid data");

const handleDocumentNotFoundError = (res, err) =>
  handleError(res, err, statusNotFound, "Item not found");

module.exports = {
  handleError,
  handleValidationError,
  handleDocumentNotFoundError,
};
