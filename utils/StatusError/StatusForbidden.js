const HttpError = require("./HttpError");

class StatusForbidden extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

module.exports = StatusForbidden;
