const mongoose = require("mongoose");
const { Schema } = mongoose;
const ptSchema = require("../db/schemas/patient.schema");

//in case i need one!
class Patient {
  constructor() {
    (this.fullname = String),
      (this.email = String),
      (this.age = Number),
      (this.full_address = String),
      (this.address_locality = String),
      (this.latlng = { lat: Number, lng: Number }),
      (this.conditions = Object),
      (this.appointments = Object);
  }
}

const Patients = mongoose.model("patients", ptSchema.PatientSchema);

//get all patient details by their ID
getOnePatient = (patientID) => {
  let val = () => "get one patient";
  return val;
};

//get shallow patient details for markers
async function getPatientMarkers(query) {
  const age_min = Number(query.ageMin);
  const age_max = Number(query.ageMax);
  let latNE = Number(query.latNE);
  let lngNE = Number(query.lngNE);
  let latSW = Number(query.latSW);
  let lngSW = Number(query.lngSW);
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
      { "latlng.lat": { $lt: latNE } },
      { "latlng.lat": { $gt: latSW } },
      { "latlng.lng": { $lt: lngNE } },
      { "latlng.lng": { $gt: lngSW } },
      conditions.length == 0 ? {} : { $or: conditions },
    ],
  }).exec();
}

async function bulk_patient_load() {
  return await Patients.insertMany(testPatients);
}

module.exports = {
  Patient,
  getOnePatient,
  getPatientMarkers,
  bulk_patient_load,
};

const testPatients = [
  {
    fullname: "Bradley Dawson",
    age: 80,
    latlng: { lat: -33.32896907410054, lng: 115.64462924197821 },
    conditions: [
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Andrew Sniewkiczk",
    age: 60,
    latlng: { lat: -33.328718074441376, lng: 115.64565921017756 },
    conditions: [
      {
        name: "Diabetes",
      },
      {
        name: "COPD",
      },
    ],
  },
  {
    fullname: "Amanda Jarvis",
    age: 30,
    latlng: { lat: -33.328718074441376, lng: 115.64662480536447 },
    conditions: [
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Delece Kasukis",
    age: 36,
    latlng: { lat: -33.328789788703496, lng: 115.64754748520973 },
    conditions: [],
  },
  {
    fullname: "Alison Baker",
    age: 42,
    latlng: { lat: -33.328933217050654, lng: 115.65046572844128 },
    conditions: [
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Fred Astaire",
    age: 52,
    latlng: { lat: -33.32907664516169, lng: 115.65364146372266 },
    conditions: [
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "Margaret Hawkney",
    age: 12,
    latlng: { lat: -33.335871281361975, lng: 115.65276169921903 },
    conditions: [
      {
        name: "Cancer",
      },
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "Denver Washington",
    age: 40,
    latlng: { lat: -33.33737714481684, lng: 115.65443539754301 },
    conditions: [
      {
        name: "Rheumatic Heart Disease",
      },
    ],
  },
  {
    fullname: "Stuart Booth",
    age: 106,
    latlng: { lat: -33.332572632349105, lng: 115.6583836089739 },
    conditions: [
      {
        name: "Joints",
      },
      {
        name: "Diabetes",
      },
      {
        name: "COPD",
      },
      {
        name: "Rheumatic Heart Disease",
      },
    ],
  },
  {
    fullname: "Giles Mandible",
    age: 20,
    latlng: { lat: -33.331945157799346, lng: 115.65988564593133 },
    conditions: [
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Wisby Griggins-Linch",
    age: 28,
    latlng: { lat: -33.347325945752814, lng: 115.64992928705526 },
    conditions: [
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Paul Merchant",
    age: 51,
    latlng: { lat: -33.34578440420649, lng: 115.65585160420162 },
    conditions: [
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Mike White",
    age: 95,
    latlng: { lat: -33.35019385740161, lng: 115.65881276277482 },
    conditions: [
      {
        name: "Joints",
      },
      {
        name: "Diabetes",
      },
      {
        name: "Cancer",
      },
      {
        name: "Rheumatic Heart Disease",
      },
      {
        name: "COPD",
      },
    ],
  },
  {
    fullname: "Tom Cranskty",
    age: 55,
    latlng: { lat: -33.3625964877, lng: 115.64821267365981 },
    conditions: [
      {
        name: "Joints",
      },
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "Billy Thekiddo",
    age: 29,
    latlng: { lat: -33.36456784121725, lng: 115.67473435479351 },
    conditions: [
      {
        name: "Cancer",
      },
      {
        name: "COPD",
      },
    ],
  },
  {
    fullname: "Ellery Batho",
    age: 12,
    latlng: { lat: -33.33456259320273, lng: 115.68833851998484 },
    conditions: [
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Brad Cannaham",
    age: 88,
    latlng: { lat: -33.341876653145405, lng: 115.68215871078863 },
    conditions: [
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Worzel Gummage",
    age: 78,
    latlng: { lat: -33.359227161360984, lng: 115.72610402062833 },
    conditions: [
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Tom Baker",
    age: 5,
    latlng: { lat: -33.31763751196873, lng: 115.70069813837725 },
    conditions: [
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "Adam Coulson",
    age: 20,
    latlng: { lat: -33.31892852379637, lng: 115.69263005414885 },
    conditions: [
      {
        name: "Joints",
      },
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "Frederick Hewson",
    age: 49,
    latlng: { lat: -33.3147685283374, lng: 115.7022430906763 },
    conditions: [
      {
        name: "COPD",
      },
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Manou Reqoire",
    age: 27,
    latlng: { lat: -33.31319054709228, lng: 115.71975255006555 },
    conditions: [
      {
        name: "Rheumatic Heart Disease",
      },
      {
        name: "Diabetes",
      },
    ],
  },
];
