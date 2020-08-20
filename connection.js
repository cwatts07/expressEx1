const { Pool } = require("pg");
const credentials = new Pool({
  user: "demo",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "Northwind",
  ssl: false
});

module.exports = credentials;