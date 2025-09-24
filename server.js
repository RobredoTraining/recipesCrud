const mongoose = require("mongoose");
const app = require("./app");
const { port } = require("./config");

// start server
const server = app.listen(port, "127.0.0.1", () => {
  console.log(`🚀 Server running at http://127.0.0.1:${port}`);
});

// graceful shutdown
async function gracefulShutdown(signal) {
  try {
    console.log(`${signal} received. Closing server and MongoDB...`);
    await mongoose.connection.close();
    await new Promise(resolve => server.close(resolve));
    console.log("✅ Process terminated");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during shutdown:", err);
    process.exit(1);
  }
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
