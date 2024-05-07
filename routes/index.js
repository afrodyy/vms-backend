const router = require("express").Router();
const roleRouter = require("./roleRouter");
const userRouter = require("./userRouter");

router.use("/api/v1", roleRouter);
router.use("/api/v1", userRouter);

module.exports = router;
