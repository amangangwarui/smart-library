import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBorrowedBooks = async () => {
    try {
      const res = await api.get("/borrow/my-books");

      // 🔥 also fetch payments
      const paymentsRes = await api.get("/payment");

      const paidBorrowIds = paymentsRes.data.map(p => p.borrow);

      const updatedBooks = res.data.books.map(book => ({
        ...book,
        isPaid: paidBorrowIds.includes(book._id)
      }));

      setBooks(updatedBooks);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (borrowId) => {
    try {
      await api.post(`/borrow/return/${borrowId}`);
      alert("Book returned successfully ✅");
      fetchBorrowedBooks();
    } catch (err) {
      alert("Return failed ❌");
    }
  };

  const handlePayNow = (borrowId) => {
    navigate(`/payment/${borrowId}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 My Dashboard</h2>

      {books.length === 0 ? (
        <p>No borrowed books yet</p>
      ) : (
        books.map((item) => (
          <div
            key={item._id}
            style={{
              background: "#fff",
              padding: "16px",
              marginBottom: "12px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{item.book.title}</h3>
            <p>Borrow Date: {new Date(item.borrowDate).toDateString()}</p>
            <p>Due Date: {new Date(item.dueDate).toDateString()}</p>
            <p><strong>Total Cost: ₹{item.totalCost}</strong></p>

            <div style={{ display: "flex", gap: "10px" }}>
              {/* 🔴 Return button - only enabled if paid */}
              <button
                onClick={() => handleReturn(item._id)}
                disabled={!item.isPaid}
                style={{
                  background: item.isPaid ? "#dc3545" : "#999",
                  color: "#fff",
                  padding: "8px",
                  cursor: item.isPaid ? "pointer" : "not-allowed"
                }}
              >
                🔄 Return
              </button>

              {/* 🟢 Pay button - disable if already paid */}
              <button
                onClick={() => handlePayNow(item._id)}
                disabled={item.isPaid}
                style={{
                  background: item.isPaid ? "#999" : "#28a745",
                  color: "#fff",
                  padding: "8px",
                  cursor: item.isPaid ? "not-allowed" : "pointer"
                }}
              >
                {item.isPaid ? "Paid ✅" : "💳 Pay Now"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;


