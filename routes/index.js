const express = require("express");
const auth = require("../middlewares/auth");
const itemsRouter = require("./clothingItem");
const usersRouter = require("./users");
const { login, createUser } = require("../controllers/users");

const { statusNotFound } = require("../utils/constants");

const router = express.Router();

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);

// Protected routes
router.use("/items", auth, itemsRouter);
router.use("/users", auth, usersRouter);

router.use((req, res) => {
  res.status(statusNotFound).send({ message: "Route not found" });
});

module.exports = router;
