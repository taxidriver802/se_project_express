const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleError } = require("../utils/errors");
const { statusUnauthorized } = require("../utils/constants");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleError(
      res,
      new Error("Authorization required"),
      statusUnauthorized,
      "Authorization required",
    );
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return handleError(res, err, statusUnauthorized, "Authorization required");
  }
};

module.exports = auth;
