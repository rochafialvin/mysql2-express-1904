const express = require("express");
const app = express();
const port = 2022;
const cors = require("cors");
const pool = require("./config/database");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("API IS RUNNING");
});

app.post("/users", async (req, res) => {
  try {
    const connection = await pool.promise().getConnection();

    const sqlAddUser = `insert into users set ?;`;
    const dataAddUser = [req.body];

    const [rows, fields] = await connection.query(sqlAddUser, dataAddUser);
    connection.release();

    res.status(200).send({ rows, fields });
  } catch (error) {
    console.log({ error });
  }
});

app.get("/users", async (req, res) => {
  try {
    const connection = await pool.promise().getConnection();

    const sqlGetAllUser = "select id, username, name, email from users;";

    // result : berisi array of data untuk query SELECT , untuk lainnya akan berisi object
    // fields
    const result = await connection.query(sqlGetAllUser);
    connection.release();

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(port, (err) => {
  if (err) return cosole.log({ err });

  console.log(`Api is running at port ${port}`);
});
