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
