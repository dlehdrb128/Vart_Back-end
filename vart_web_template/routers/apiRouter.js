const express = require("express");
const router = express.Router();

const signRouter = require("./signRouter");
const companyRouter = require("./companyRouter");
const publicinfoRouter = require("./publicinfoRouter");
const serviceRouter = require("./serviceRouter");
const mainpage = require("./mainpage");


router.use("/sign", signRouter);
router.use("/company", companyRouter);
router.use("/publicinfo", publicinfoRouter);
router.use("/about", serviceRouter);
router.use("/", mainpage);

module.exports = router;
