const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(500).send({ message: "Route not found" });
});

module.exports = router;
