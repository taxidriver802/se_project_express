const express = require("express");
const itemsRouter = require("./clothingItem");
const usersRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { statusNotFound } = require("../utils/constants");

const router = express.Router();

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);

// Routes
router.use("/items", auth, itemsRouter);
router.use("/users", auth, usersRouter);

router.use((req, res) => {
  const notFoundError = new statusNotFound();
  res.status(notFoundError.statusCode).send({ message: notFoundError.message });
});

module.exports = router;
