const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* CORS*/
app.use(cors({
  origin: "https://smart-library-frontend-enbb.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.options("*", cors());

app.use(express.json());

/* ===== ROUTES ===== */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/borrow", require("./routes/borrowRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
