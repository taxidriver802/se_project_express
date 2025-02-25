const User = require("../models/user");
const {
  handleError,
  handleValidationError,
  handleDocumentNotFoundError,
} = require("../utils/errors");
const {
  statusOk,
  statusCreated,
  statusBadRequest,
} = require("../utils/constants");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(statusOk).send(users))
    .catch((err) => handleError(res, err));
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(statusCreated).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return handleValidationError(res, err);
      }
      return handleError(res, err);
    });
};

// GET /users/:userId
const getUser = (req, res) => {
  const { userId } = req.params;
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

module.exports = {
  getUsers,
  createUser,
  getUser,
};
