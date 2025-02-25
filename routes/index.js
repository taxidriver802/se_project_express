const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");

const { statusNotFound } = require("../utils/constants");

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(statusNotFound).send({ message: "Route not found" });
});

module.exports = router;
