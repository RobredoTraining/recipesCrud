const mongoose = require("mongoose");

async function connectDB(db) {
    const uri = `mongodb://${db.host}:${db.port}/${db.name}`;
    console.log(uri);
  try {
    await mongoose.connect(uri);
    console.log(`✅ Connected to MongoDB: ${db.name}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
