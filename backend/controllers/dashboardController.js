const Borrow = require("../models/Borrow");

exports.getDashboard = async (req, res) => {
  const borrows = await Borrow.find({ user: req.user }).populate("book");
  res.json(borrows);
};
