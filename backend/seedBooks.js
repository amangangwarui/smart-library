require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/Book"); // adjust path if needed

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const books = [
      { title: "Clean Code", author: "Robert C. Martin", pricePerDay: 10 },
      { title: "Atomic Habits", author: "James Clear", pricePerDay: 8 },
      { title: "Deep Work", author: "Cal Newport", pricePerDay: 9 },
      { title: "You Don't Know JS", author: "Kyle Simpson", pricePerDay: 7 },
      { title: "System Design", author: "Alex Xu", pricePerDay: 12 },
      { title: "JavaScript Patterns", author: "Stoyan Stefanov", pricePerDay: 6 },
      { title: "Eloquent JavaScript", author: "Marijn Haverbeke", pricePerDay: 7 },
      { title: "Design Patterns", author: "GOF", pricePerDay: 11 },
      { title: "Refactoring", author: "Martin Fowler", pricePerDay: 10 },
      { title: "Cracking the Coding Interview", author: "Gayle McDowell", pricePerDay: 9 },
      { title: "Introduction to Algorithms", author: "CLRS", pricePerDay: 15 },
      { title: "Operating Systems", author: "Galvin", pricePerDay: 13 },
      { title: "Database Systems", author: "Ramakrishnan", pricePerDay: 12 },
      { title: "Computer Networks", author: "Tanenbaum", pricePerDay: 11 },
      { title: "Effective Java", author: "Joshua Bloch", pricePerDay: 10 },
      { title: "Head First Java", author: "Kathy Sierra", pricePerDay: 6 },
      { title: "Python Crash Course", author: "Eric Matthes", pricePerDay: 7 },
      { title: "Fluent Python", author: "Luciano Ramalho", pricePerDay: 9 },
      { title: "Machine Learning", author: "Tom Mitchell", pricePerDay: 14 },
      { title: "Artificial Intelligence", author: "Stuart Russell", pricePerDay: 15 }
    ];

    Book.deleteMany({})
      .then(() => Book.insertMany(books))
      .then(() => {
        console.log(" Books Seeded Successfully");
        process.exit();
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
