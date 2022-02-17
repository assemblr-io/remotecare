const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("respond with an api resource index");
});

module.exports = router;
