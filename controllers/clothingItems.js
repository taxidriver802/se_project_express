const ClothingItem = require("../models/clothingItem");
const {
  handleError,
  handleValidationError,
  handleDocumentNotFoundError,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  console.log(name, weather, imageUrl);

  ClothingItem.create({ name, weather, imageUrl })
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
      handleError(res, err);
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

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
