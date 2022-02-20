const patient = require("../models/patients");

exports.get_visible_patients = async function (req, res) {

  //pass in age, conditions, specialty, latlng
  const result = await patient.getPatientMarkers(req.query);
  if (result) res.send(result);
  else res.send(result, 401);
};

exports.bulk_pt_post = async function (req, res) {
  const result = await patient.bulk_patient_load();
  res.send(result, 201);
};
