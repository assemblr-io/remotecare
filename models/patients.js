const mongoose = require("mongoose");
const { Schema } = mongoose;
const ptSchema = require("../db/schemas/patient.schema");
const ApiError = require("../errors/ApiError");

const Patients = mongoose.model("patients", ptSchema.PatientSchema);

//get shallow patient details for markers
async function getPatientMarkers(query) {
  const age_min = Number(query.ageMin);
  const age_max = Number(query.ageMax);
  const coords = {
    latNE: Number(query.latNE),
    lngNE: Number(query.lngNE),
    latSW: Number(query.latSW),
    lngSW: Number(query.lngSW),
  };

  let diseases = query.diseases.split(",");
  let conditions =
    query.diseases.length != 0
      ? diseases.map((disease) => {
          return { "conditions.name": disease };
        })
      : [];

  return await Patients.find({
    $and: [
      { age: { $gte: age_min } },
      { age: { $lte: age_max } },
      { "latlng.lat": { $lt: coords.latNE } },
      { "latlng.lat": { $gt: coords.latSW } },
      { "latlng.lng": { $lt: coords.lngNE } },
      { "latlng.lng": { $gt: coords.lngSW } },
      conditions.length == 0 ? {} : { $or: conditions },
    ],
  }).exec();
}

async function bulk_patient_load(testPatients) {
  if (!testPatients) {
    throw ApiError.badRequest("body mal-formed");
  }

  try {
    if (testPatients.length) {
      return (await Patients.insertMany(testPatients)) ? testPatients.length : -1;
    }
  } catch (err) {
    return err;
  }
}

module.exports = {
  Patients,
  getPatientMarkers,
  bulk_patient_load,
};
