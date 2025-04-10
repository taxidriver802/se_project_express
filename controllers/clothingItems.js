const ClothingItem = require("../models/clothingItem");

const {
  statusOk,
  statusCreated,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/constants");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(statusCreated).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid item data"));
      }
      next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(statusOk).send(items))
    .catch(next); // Let error handler handle it
};

const deleteItem = (req, res, next) => {
  const itemId = req.params.id;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      if (item.owner.toString() !== userId) {
        throw new ForbiddenError(
          "You do not have permission to delete this item",
        );
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((deletedItem) => {
      if (!deletedItem) {
        throw new NotFoundError("Item could not be deleted");
      }
      res.status(statusOk).send(deletedItem);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.status(statusOk).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      next(err);
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.status(statusOk).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
