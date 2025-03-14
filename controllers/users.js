const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

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

// POST /users
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        avatar,
        email,
        password: hashedPassword,
      }),
    )
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
        return res
          .status(statusConflict)
          .json({ message: "Email already exists" });
      }
      return handleError(res, err);
    });
};

// POST /login
function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(statusBadRequest)
      .json({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(statusOk).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return res
          .status(statusUnauthorized)
          .json({ message: "Incorrect email or password" });
      }
      return handleError(
        res,
        err,
        statusBadRequest,
        "Incorrect email or password",
      );
    });
}

// GET /users/me
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
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
