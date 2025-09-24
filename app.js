require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { db } = require("./config");
const recipesRoutes = require("./routes/recipes");

const app = express();

// middlewares
app.use(express.json());

// conectar a DB con config
connectDB(db);

// rutas
app.use("/api/recipes", recipesRoutes);

module.exports = app;
