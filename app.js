require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { db } = require("./config");
const recipesRoutes = require("./routes/recipes");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// 🛠 Middlewares
app.use(express.json());
app.use(helmet());

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🚦 Global Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 🔌 Connect DB
connectDB(db);

// 📌 Routes
app.use("/api/recipes", recipesRoutes);

// ❌ Error handler
app.use(errorHandler);

module.exports = app;
