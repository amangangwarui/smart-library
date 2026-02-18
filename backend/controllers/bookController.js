const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ available: true });//
    res.json(books);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


