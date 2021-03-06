const patient = require("../models/patients");
const ApiError = require("../errors/ApiError");

exports.get_visible_patients = async function (req, res, next) {
  const query = req.query;

  try {
    if (!Object.keys(query).length) {
      return next(ApiError.badRequest("query values are mal-formed"));
    }
    const result = await patient.getPatientMarkers(req.query);
    res.status(200).send(result);
  } catch (error) {
    //add winston or other logger in here for prod
    return next(error);
  }
};

exports.bulk_pt_post = async function (req, res, next) {
  if (!req.body) {
    return next(ApiError.badRequest("body mal-formed"));
  }

  try {
    const result = await patient.bulk_patient_load(req.body);
    res.status(200).send(result);
  } catch (error) {
    return next(error);
  }
};
