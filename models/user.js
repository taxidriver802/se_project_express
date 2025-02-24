const mongooose = require("mongoose");
const validator = require("validator");

const userSchema = new mongooose.Schema({
  name: {
    type: String,
    required: [true, "The avatar is required."],
    minlength: 2,
    maxlength: 30,
  },
  avatar: { type: String, required: true },
  validate: {
    validator: (v) => validator.isURL(v),
    message: "Invalid URL",
  },
});

module.exports = mongooose.model("user", userSchema);
