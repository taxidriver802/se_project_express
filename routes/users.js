const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateUpdateUser } = require("../middlewares/validation");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, validateUpdateUser, updateCurrentUser);

module.exports = router;
