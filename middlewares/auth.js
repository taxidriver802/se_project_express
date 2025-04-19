const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { StatusUnauthorized } = require("../utils/StatusError/index.js");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new StatusUnauthorized("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new StatusUnauthorized("Authorization required"));
  }
};

module.exports = auth;
