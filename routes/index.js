const express = require("express");
const itemsRouter = require("./clothingItem");
const usersRouter = require("./users");
const { login, createUser } = require("../controllers/users");

const { statusNotFound } = require("../utils/constants");

const router = express.Router();

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);

// Routes
router.use("/items", itemsRouter);
router.use("/users", usersRouter);

router.use((req, res) => {
  res.status(statusNotFound).send({ message: "Route not found" });
});

module.exports = router;
