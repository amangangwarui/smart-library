const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Borrow = require("../models/Borrow");

router.get("/", protect, async (req, res) => {
  try {
    const borrows = await Borrow.find({
      user: req.user,      
      returned: false,
    }).populate("book");

    res.json(borrows);

  } catch (error) {
    res.status(500).json({ message: "Dashboard error" });
  }
});

module.exports = router;
