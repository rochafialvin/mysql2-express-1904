const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host: "localhost",
  database: "mysql_express",
  user: "root",
  password: "Mysql123",
  waitForConnections: true,
  connectionLimit: 50,
});

module.exports = pool;
