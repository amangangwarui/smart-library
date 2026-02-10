import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

const Books = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Fetch books error", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      await api.post(`/borrow/${bookId}`);
      alert("Book borrowed successfully");
      fetchBooks(); // 🔄 refresh UI
    } catch (err) {
      alert(err.response?.data?.message || "Borrow failed");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ padding: "20px" }}>
        <h2>All Books</h2>

        {books.map((book) => (
          <div
            key={book._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              background: "#fff",
            }}
          >
            <h3>{book.title}</h3>
            <p>₹{book.pricePerDay}/day</p>

            <button
              disabled={!book.available}
              onClick={() => handleBorrow(book._id)}
              style={{
                padding: "8px 14px",
                border: "none",
                borderRadius: "5px",
                color: "white",
                backgroundColor: book.available ? "#0d6efd" : "#dc3545",
                cursor: book.available ? "pointer" : "not-allowed",
              }}
            >
              {book.available ? "Borrow" : "Not Available"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Books;
