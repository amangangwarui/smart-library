const Payment = require("../models/Payment");
const Borrow = require("../models/Borrow");

exports.payNow = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    // Check if already paid
    const existingPayment = await Payment.findOne({ borrow: borrow._id });
    if (existingPayment) {
      return res.status(400).json({ message: "Already paid" });
    }

    const payment = await Payment.create({
      borrow: borrow._id,
      amount: borrow.totalCost,
      status: "paid"
    });

    res.json({ message: "Payment successful", payment });
  } catch (err) {
    res.status(500).json({ message: "Payment failed" });
  }
};

