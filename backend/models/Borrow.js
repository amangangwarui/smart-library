const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  borrowDate: { type: Date, default: Date.now }, 
  dueDate: { type: Date, required: true },
  returned: { type: Boolean, default: false },
  totalCost: { type: Number, default: 0 }
});

module.exports = mongoose.model("Borrow", borrowSchema);
