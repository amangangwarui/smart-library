const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  borrow: { type: mongoose.Schema.Types.ObjectId, ref: "Borrow" },
  amount: Number,
  paidAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
