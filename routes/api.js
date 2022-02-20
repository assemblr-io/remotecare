const express = require("express");
const router = express.Router();
const patient = require("../controllers/patientController");

router.get("/", function (req, res, next) {
  res.send("respond with an api resource index");
});

router.get("/patient/markers", patient.get_visible_patients);

router.get("/patient/bulk", patient.bulk_pt_post);

module.exports = router;
