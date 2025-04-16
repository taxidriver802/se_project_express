const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { statusUnauthorized } = require("../utils/constants");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new statusUnauthorized("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new statusUnauthorized("Authorization required"));
  }
};

module.exports = auth;
