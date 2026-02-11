const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

/* ================= BORROW BOOK ================= */
exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ msg: "Book ID is required" });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (!book.available) {
      return res.status(400).json({ msg: "Book not available" });
    }

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 7); // 7 days borrow period

    const borrow = await Borrow.create({
      user: req.user,
      book: bookId,
      borrowDate,
      dueDate,
      totalCost: 0,
      returned: false
    });

    // Mark book unavailable
    book.available = false;
    await book.save();

    res.status(201).json(borrow);

  } catch (err) {
    console.error("Borrow Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};


/* ================= RETURN BOOK ================= */
exports.returnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id).populate("book");

    if (!borrow) {
      return res.status(404).json({ msg: "Borrow record not found" });
    }

    if (borrow.returned) {
      return res.status(400).json({ msg: "Book already returned" });
    }

    borrow.returned = true;

    const days =
      Math.ceil((new Date() - borrow.borrowDate) / (1000 * 60 * 60 * 24)) || 1;

    borrow.totalCost = days * borrow.book.pricePerDay;

    await borrow.save();

    // Make book available again
    borrow.book.available = true;
    await borrow.book.save();

    res.json(borrow);

  } catch (err) {
    console.error("Return Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

