const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  updateItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:id", updateItem);

// Delete
router.delete("/:id", deleteItem);

// Like
router.put("/:itemId/likes", likeItem);

// Unlike
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
