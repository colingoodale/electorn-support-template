const router = require("express").Router();
const authRoutes = require("./auth");
const apiRoutes = require("./api");
const checkIfAuthenticated = require("../middleware/checkIfAuthenticated");

router.use("/auth", authRoutes);
// router.use("/api", checkIfAuthenticated, apiRoutes);

module.routes = router;