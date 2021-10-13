const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
  id: Number,
  Name: String,
});

module.exports = mongoose.model("roles", rolesSchema);
