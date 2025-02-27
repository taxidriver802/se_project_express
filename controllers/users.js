const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  handleError,
  handleValidationError,
  handleDocumentNotFoundError,
} = require("../utils/errors");
const {
  statusOk,
  statusCreated,
  statusBadRequest,
  statusConflict,
  statusUnauthorized,
} = require("../utils/constants");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(statusOk).send(users))
    .catch((err) => handleError(res, err));
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return User.create({
        name,
        avatar,
        email,
        password: hashedPassword,
      });
    })
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(statusCreated).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return handleValidationError(res, err);
      }
      if (err.code === 11000) {
        return handleError(res, err, statusConflict, "Email already exists");
      }
      return handleError(res, err);
    });
};

// POST /login
const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(statusOk).send({ token });
    })
    .catch((err) => {
      return handleError(
        res,
        err,
        statusUnauthorized,
        "Incorrect email or password",
      );
    });
};

// GET /users/:userId
const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new Error("DocumentNotFoundError"))
    .then((user) => res.status(statusOk).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return handleError(res, err, statusBadRequest, "Invalid user ID");
      }
      if (err.message === "DocumentNotFoundError") {
        return handleDocumentNotFoundError(res, err);
      }
      return handleError(res, err);
    });
};

// PATCH /users/me
const updateCurrentUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail(new Error("DocumentNotFoundError"))
    .then((user) => res.status(statusOk).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return handleValidationError(res, err);
      }
      if (err.message === "DocumentNotFoundError") {
        return handleDocumentNotFoundError(res, err);
      }
      return handleError(res, err);
    });
};

module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
