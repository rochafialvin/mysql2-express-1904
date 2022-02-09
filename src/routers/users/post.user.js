const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const result = await insertUser(req.body);
    res.status(200).send({ result });
  } catch (error) {
    console.log({ error });
  }
});
router.post("/users2");
router.post("/users3");
router.post("/users4");
router.post("/users5");
router.post("/users6");
router.post("/users7");

module.exports = router;
