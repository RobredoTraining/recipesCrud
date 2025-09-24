const config = require("config");

module.exports = {
  port: config.get("port"),
  db: config.get("db"),
  jwt: config.has("jwt") ? config.get("jwt") : null,
  logging: config.has("logging") ? config.get("logging") : false
};
