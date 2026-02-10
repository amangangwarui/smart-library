const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  pricePerDay: Number,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Book", bookSchema);
