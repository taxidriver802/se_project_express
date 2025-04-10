const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const {
  statusOk,
  statusCreated,
  statusBadRequest,
  statusConflict,
  statusUnauthorized,
  statusNotFound,
} = require("../utils/constants");

// POST /users
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword }),
    )
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(statusCreated).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new statusBadRequest("Invalid user data"));
      }
      if (err.code === 11000) {
        return next(new statusConflict("Email already exists"));
      }
      next(err);
    });
};

// POST /login
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new statusBadRequest("Email and password are required"));
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(statusOk).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new statusUnauthorized("Incorrect email or password"));
      }
      next(err);
    });
};

// GET /users/me
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => new statusNotFound("User not found"))
    .then((user) => res.status(statusOk).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new statusBadRequest("Invalid user ID"));
      }
      next(err);
    });
};

// PATCH /users/me
const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new statusNotFound("User not found"))
    .then((user) => res.status(statusOk).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new statusBadRequest("Invalid user update data"));
      }
      next(err);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
