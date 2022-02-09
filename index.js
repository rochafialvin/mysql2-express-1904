const express = require("express");
const app = express();
const port = 2023;
// Digunakan untuk memungkin api ini dihubungi dari berbagai alamat
const cors = require("cors");
const bodyParser = require("body-parser");

const transactionRouter = require("./src/routers/transaction");
const userRouter = require("./src/routers/users");

// axios.post("/products", { name: 'Laptop', brand: 'Asus' })

app.use(cors());
app.use(bodyParser.json()); // agar dapat membaca req.body
app.use(express.json()); // agar dapat membaca req.body
app.use(express.static("public"));

// localhost:2023/
app.get("/", (req, res) => {
  res.status(200).send("API IS RUNNING");
});

app.use("/users", userRouter);
app.use("/transactions", transactionRouter);

app.listen(port, (err) => {
  if (err) return cosole.log({ err });

  console.log(`Api is running at port ${port}`);
});
