const statusOk = 200;
const statusCreated = 201;

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class statusBadRequest extends HttpError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class statusUnauthorized extends HttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class statusForbidden extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

class statusNotFound extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class statusConflict extends HttpError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

class statusDefault extends HttpError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

module.exports = {
  statusOk,
  statusCreated,
  HttpError,
  statusBadRequest,
  statusUnauthorized,
  statusForbidden,
  statusNotFound,
  statusConflict,
  statusDefault,
};
