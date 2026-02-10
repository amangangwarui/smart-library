const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

exports.borrowBook = async (req, res) => {
  const { bookId } = req.body;

  const book = await Book.findById(bookId);
  if (!book || !book.available)
    return res.status(400).json({ msg: "Book not available" });

  const borrowDate = new Date();
  const dueDate = new Date(borrowDate);
  dueDate.setDate(dueDate.getDate() + 7); 

  const borrow = await Borrow.create({
    user: req.user,
    book: bookId,
    borrowDate,
    dueDate,
    totalCost: 0
  });

  book.available = false;
  await book.save();

  res.json(borrow);
};

exports.returnBook = async (req, res) => {
  const borrow = await Borrow.findById(req.params.id).populate("book");
  borrow.returned = true;

  const days =
    Math.ceil((new Date() - borrow.borrowDate) / (1000 * 60 * 60 * 24)) || 1;

  borrow.totalCost = days * borrow.book.pricePerDay;
  await borrow.save();

  borrow.book.available = true;
  await borrow.book.save();

  res.json(borrow);
};
