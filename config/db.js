const mongoose = require("mongoose");

async function connectDB(dbConfig) {
  try {
    const uri = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connected: ${uri}`);
    console.log('DB connected:', dbConfig.name, '💿')
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
