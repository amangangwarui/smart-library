const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

/**
 * ===============================
 * 📚 BORROW A BOOK
 * ===============================
 */
router.post("/:bookId", protect, async (req, res) => {
  try {
    // 🔒 Allow only ONE active borrow per user
    const existingBorrow = await Borrow.findOne({ user: req.user.id });
    if (existingBorrow) {
      return res
        .status(400)
        .json({ message: "You already borrowed a book. Return it first." });
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!book.available) {
      return res.status(400).json({ message: "Book not available" });
    }

    // 📅 Dates
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3); // 3 days default

    // 💰 Cost calculation
    const totalCost = 3 * book.pricePerDay;

    // 📌 Create borrow record
    const borrow = await Borrow.create({
      user: req.user.id,
      book: book._id,
      borrowDate,
      dueDate,
      totalCost,
    });

    // 🔴 Make book unavailable
    book.available = false;
    await book.save();

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Borrow failed" });
  }
});

/**
 * ===============================
 * 📦 GET MY BORROWED BOOKS
 * ===============================
 */
router.get("/my-books", protect, async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user.id }).populate("book");

    res.json({
      books: borrows.map((b) => ({
        _id: b._id,
        book: b.book,
        borrowDate: b.borrowDate,
        dueDate: b.dueDate,
        totalCost: b.totalCost,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 *  RETURN BOOK
 */
router.post("/return/:id", protect, async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id).populate("book");

    if (!borrow) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    //  Make book available again
    borrow.book.available = true;
    await borrow.book.save();

    //  DELETE borrow record 
    await Borrow.findByIdAndDelete(req.params.id);

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Return failed" });
  }
});

module.exports = router;
