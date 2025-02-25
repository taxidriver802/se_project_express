const ClothingItem = require("../models/clothingItem");
const {
  handleError,
  handleValidationError,
  handleDocumentNotFoundError,
} = require("../utils/errors");
const {
  statusOk,
  statusCreated,
  statusBadRequest,
  statusDefault,
} = require("../utils/constants");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(statusCreated).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return handleValidationError(res, err);
      }
      return handleError(res, err);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(statusOk).send(items))
    .catch((err) =>
      handleError(res, err, statusDefault, "Failed to retrieve items"),
    );
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  ClothingItem.findByIdAndDelete(id)
    .orFail(new Error("DocumentNotFoundError"))
    .then((item) => res.status(statusOk).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return handleError(res, err, statusBadRequest, "Invalid item ID");
      }
      if (err.message === "DocumentNotFoundError") {
        return handleDocumentNotFoundError(res, err);
      }
      return handleError(res, err);
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error("DocumentNotFoundError"))
    .then((item) => res.status(statusOk).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return handleError(res, err, statusBadRequest, "Invalid item ID");
      }
      if (err.message === "DocumentNotFoundError") {
        return handleDocumentNotFoundError(res, err);
      }
      return handleError(res, err);
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error("DocumentNotFoundError"))
    .then((item) => res.status(statusOk).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return handleError(res, err, statusBadRequest, "Invalid item ID");
      }
      if (err.message === "DocumentNotFoundError") {
        return handleDocumentNotFoundError(res, err);
      }
      return handleError(res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
