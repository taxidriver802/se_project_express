const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Get users");
});
router.get("/:userId", (req, res) => {
  res.send("get users by id");
});
router.post("/", (req, res) => {
  res.send("post users");
});

module.exports = router;
