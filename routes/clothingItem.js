const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", auth, createItem);

// Read
router.get("/", getItems);

// Delete
router.delete("/:id", auth, deleteItem);

// Like
router.put("/:itemId/likes", auth, likeItem);

// Unlike
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
