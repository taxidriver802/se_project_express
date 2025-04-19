const express = require("express");
const itemsRouter = require("./clothingItem");
const usersRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const { StatusNotFound } = require("../utils/StatusError/index");
const { validateLogin, validateUser } = require("../middlewares/validation");

const router = express.Router();

// Public routes
router.post("/signin", validateLogin, login);
router.post("/signup", validateUser, createUser);

// Routes
router.use("/items", itemsRouter);
router.use("/users", usersRouter);

// Handle unknown routes
router.use((req, res, next) => {
  next(new StatusNotFound("The requested resource was not found"));
});

module.exports = router;
