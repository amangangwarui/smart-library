const Borrow = require("../models/Borrow");

exports.getDashboard = async (req, res) => {
  try {
    const borrows = await Borrow
      .find({ user: req.user })
      .populate("book");

    res.json(borrows);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
