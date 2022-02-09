const router = require("express").Router();

const getUserRouter = require("./get.user");
const postUserRouter = require("./post.user");

router.use(getUserRouter);
router.use(postUserRouter);

module.exports = router;
