const router = require("express").Router();
const pool = require("../../config/database");
const { insertUser } = require("../../models/user");

const postTransactionController = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();
    // Memulai proses transaction
    await connection.beginTransaction();

    // Run query here
    try {
      // Insert data into transaction table
      // pending
      const sqlInsertTransaction = "insert into transaction set ?;";
      const dataInsertTransaction = [
        {
          invoice: req.body.invoice,
          address: req.body.address,
          courier: req.body.courier,
        },
      ];
      const [transactionResult] = await connection.query(
        sqlInsertTransaction,
        dataInsertTransaction
      );

      // bulk insert : insert data banyak sekaligus
      // pending
      const sqlInsertDetailTransaction =
        "insert into detailTransaction (transaction_id, name, quantity, price) values ?";

      // req.products = [     ["hoodie", 1, 50000],       ["t-shirt", 3, 150000]        ]

      // dataInsertDetailTransaction = [ [12,"hoodie", 1, 50000], [12, "t-shirt", 3, 150000] ]

      // product : ["t-shirt", 3, 150000]
      // return :  [12, "t-shirt", 3, 150000]
      const dataInsertDetailTransaction = req.body.products.map((product) => [
        transactionResult.insertId,
        ...product,
      ]);

      await connection.query(sqlInsertDetailTransaction, [
        dataInsertDetailTransaction,
      ]);

      await insertUser({});

      // run all pending queries
      connection.commit();
      res.send("Input transaction success");
    } catch (error) {
      // cancel all pending queries
      connection.rollback();
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

router.post("/", postTransactionController);

module.exports = router;
// localhost:2022/transactions/
