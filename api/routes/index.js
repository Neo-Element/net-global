const router = require("express").Router();
const adminRouter = require("./adminRoutes/index");
const authRoute = require("./auth");
const securityRouter = require("./securityRoutes");

router.use("/admin", adminRouter);
router.use("/user", securityRouter);
router.use("/auth", authRoute);

module.exports = router;
