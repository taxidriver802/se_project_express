const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateClothingItem,
  validateId,
  validateItemId,
} = require("../middlewares/validation");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", auth, validateClothingItem, createItem);

// Read
router.get("/", getItems);

// Delete
router.delete("/:id", auth, validateId, deleteItem);

// Like
router.put("/:itemId/likes", auth, validateItemId, likeItem);

// Unlike
router.delete("/:itemId/likes", auth, validateItemId, dislikeItem);

module.exports = router;
