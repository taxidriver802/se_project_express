const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  updateItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:id", updateItem);

// Delete
router.delete("/:id", deleteItem);

module.exports = router;
