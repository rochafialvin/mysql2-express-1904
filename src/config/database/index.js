require("dotenv").config();
const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host: "localhost",
  database: "mysql1904",
  user: "root",
  password: process.env.DB_PASS,
  waitForConnections: true,
  connectionLimit: 50,
});

module.exports = pool;
