const ClothingItem = require("../models/clothingItem");
const {
  handleError,
  handleValidationError,
  handleDocumentNotFoundError,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return handleValidationError(res, err);
      }
      return handleError(res, err);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
    })
    .catch((err) => {
      handleError(res, err, 400, "Failed to retrieve items");
    });
};

const updateItem = (req, res) => {
  const { id } = req.params;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(
    id,
    { name, weather, imageUrl },
    { new: true, runValidators: true },
  )
    .orFail(new Error("DocumentNotFoundError"))
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      if (err.message === "DocumentNotFoundError") {
        return handleDocumentNotFoundError(res, err);
      }
      if (err.name === "ValidationError") {
        return handleValidationError(res, err);
      }
      return handleError(res, err);
    });
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  ClothingItem.findByIdAndDelete(id)
    .orFail(new Error("DocumentNotFoundError"))
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
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
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
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
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      if (err.message === "DocumentNotFoundError") {
        return handleDocumentNotFoundError(res, err);
      }
      return handleError(res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
