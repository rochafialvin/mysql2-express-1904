const router = require("express").Router();
const pool = require("../../config/database");

const postTransactionController = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();
    // Memulai proses transaction
    await connection.beginTransaction();

    // Run query here
    try {
      // Insert data into transaction table
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

      const sqlInsertDetailTransaction =
        "insert into detailTransaction (transaction_id, name, quantity, price) values ?";
      const dataInsertDetailTransaction = req.body.products.map((product) => [
        transactionResult.insertId,
        ...product,
      ]);

      await connection.query(sqlInsertDetailTransaction, [
        dataInsertDetailTransaction,
      ]);

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
