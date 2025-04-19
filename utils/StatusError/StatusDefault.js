const HttpError = require("./HttpError");

class StatusDefault extends HttpError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

module.exports = StatusDefault;
