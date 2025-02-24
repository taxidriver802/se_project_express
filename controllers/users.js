const User = require("../models/user");
const { handleError, handleCastNotFoundError } = require("../utils/errors");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleError(res, err));
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return handleError(res, err, 400, "Invalid data");
      }
      return handleError(res, err);
    });
};

// GET /users/:userId
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      handleCastNotFoundError(res, err);
      return handleError(res, err);
    });
};

// DELETE /users/:userId
const deleteUser = (req, res) => {
  const { userId } = req.params;
  User.findByIdAndRemove(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      handleCastNotFoundError(res, err);
      return handleError(res, err);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
};
