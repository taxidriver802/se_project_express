const HttpError = require("./HttpError");

class StatusBadRequest extends HttpError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

module.exports = StatusBadRequest;
