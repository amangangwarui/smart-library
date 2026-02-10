// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/api";

// export default function Payment() {
//   const { id } = useParams();
//   const nav = useNavigate();

//   const pay = async () => {
//     await api.post(`/payment/${id}`);
//     alert("Payment successful");
//     nav("/dashboard");
//   };

//   return (
//     <div className="card">
//       <h2>Payment</h2>
//       <button onClick={pay}>Pay Now</button>
//     </div>
//   );
// }



import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useState } from "react";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    try {
      setLoading(true);
      await api.post(`/payment/${id}`);
      alert("Payment successful ✅");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: "20px" }}>
      <h2>Payment</h2>

      <button
        onClick={pay}
        disabled={loading}
        style={{
          background: "#28a745",
          color: "#fff",
          padding: "10px 16px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

