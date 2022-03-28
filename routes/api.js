const express = require("express");
const router = express.Router();
const patient = require("../controllers/patientController");
const google = require("../controllers/googleController");

router.get("/", function (req, res, next) {
  res.status(200).send("not implemented");
});

router.get("/patient/markers", patient.get_visible_patients);

router.post("/patient/bulk", patient.bulk_pt_post);

router.get("/patient/distance", google.distance_service);

module.exports = router;
