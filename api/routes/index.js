const router = require("express").Router();
const adminRouter = require("./adminRoutes");
const authRoute = require("./auth");
const securityRouter = require("./securityRoutes");

router.use("/admin", adminRouter);
router.use("/security", securityRouter);
router.use("/auth", authRoute);

module.exports = router;
