const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const Payment = require("../models/Payment");

//  Pay for a borrow
router.post("/:id", paymentController.payNow);

//  Get all payments 
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payments" });
  }
});

module.exports = router;
