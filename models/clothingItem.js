const mongooose = require("mongoose");

const clothingItemSchema = new mongooose.Schema({});

module.exports = mongooose.model("item", clothingItemSchema);
