app.post("/users", async (req, res) => {
  try {
    const result = await insertUser(req.body);
    res.status(200).send({ result });
  } catch (error) {
    console.log({ error });
  }
});
