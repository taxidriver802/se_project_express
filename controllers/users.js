const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const {
  StatusBadRequest,
  StatusConflict,
  StatusUnauthorized,
  StatusNotFound,
} = require("../utils/StatusError/index");

// POST /users
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword }),
    )
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new StatusBadRequest("Invalid user data"));
      }
      if (err.code === 11000) {
        return next(new StatusConflict("Email already exists"));
      }
      return next(err);
    });
};

// POST /login
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new StatusBadRequest("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new StatusUnauthorized("Incorrect email or password"));
      }
      return next(err);
    });
};

// GET /users/me
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  return User.findById(userId)
    .orFail(() => new StatusNotFound("User not found"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new StatusBadRequest("Invalid user ID"));
      }
      return next(err);
    });
};

// PATCH /users/me
const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new StatusNotFound("User not found"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new StatusBadRequest("Invalid user update data"));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
