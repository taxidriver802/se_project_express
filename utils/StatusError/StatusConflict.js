const HttpError = require("./HttpError");

class StatusConflict extends HttpError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

module.exports = StatusConflict;
