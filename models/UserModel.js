const mongo = require("mongoose");

let userSchema = new mongo.Schema({
  name: {
    required: true,
    type: String,
  }
})

let user = mongo.model("green", userSchema);

module.exports = user;