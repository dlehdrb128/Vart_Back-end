const express = require("express");
const router = express.Router();
// 서비스
router.get("/service", (req, res) => {
  res.send("service");
});
// 고객센터
router.get("/customer", (req, res) => {
  res.send("customer");
});
// 공지사항
router.get("/notice", (req, res) => {
  res.send("notice");
});
// 소개
router.get("/introduce", (req, res) => {
  res.send("introduce");
});
module.exports = router;
