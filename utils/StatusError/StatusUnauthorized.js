const HttpError = require("./HttpError");

class StatusUnauthorized extends HttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

module.exports = StatusUnauthorized;
