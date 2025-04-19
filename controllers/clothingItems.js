const ClothingItem = require("../models/clothingItem");

const {
  StatusBadRequest,
  StatusNotFound,
  StatusForbidden,
} = require("../utils/StatusError/index.js");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new StatusBadRequest("Invalid item data"));
      }
      return next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(next); // Let error handler handle it
};

const deleteItem = (req, res, next) => {
  const itemId = req.params.id;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => new StatusNotFound("Item not found"))
    .then((item) => {
      if (item.owner.toString() !== userId) {
        throw new StatusForbidden(
          "You do not have permission to delete this item",
        );
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((deletedItem) => {
      if (!deletedItem) {
        throw new StatusNotFound("Item could not be deleted");
      }
      res.status(200).send(deletedItem);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new StatusBadRequest("Invalid item ID"));
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new StatusBadRequest("Invalid item ID"));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new StatusBadRequest("Invalid item ID"));
      }
      return next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
