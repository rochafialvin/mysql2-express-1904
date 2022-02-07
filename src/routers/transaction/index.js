const router = require("express").Router();

const postTransactionRouter = require("./post.transaction");

router.use(postTransactionRouter);

module.exports = router;
