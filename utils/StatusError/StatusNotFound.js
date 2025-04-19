const HttpError = require("./HttpError");

class StatusNotFound extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

module.exports = StatusNotFound;
