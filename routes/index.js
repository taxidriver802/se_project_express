const express = require("express");
const itemsRouter = require("./clothingItem");
const usersRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { StatusNotFound } = require("../utils/StatusError/index.js");

const router = express.Router();

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);

// Routes
router.use("/items", itemsRouter);
router.use("/users", usersRouter);

router.use((req, res) => {
  const notFoundError = new StatusNotFound();
  res.status(notFoundError.statusCode).send({ message: notFoundError.message });
});

module.exports = router;
