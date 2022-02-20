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
    fullname: "Dave Chandler",
    age: 47,
    latlng: { lat: -33.33366621996607, lng: 115.63606763087668 },
    conditions: [
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "Bob Chandler",
    age: 74,
    latlng: { lat: -33.33406958910041, lng: 115.63369655773926 },
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
    fullname: "Lauren Madoobie",
    age: 30,
    latlng: { lat: -33.362022994475154, lng: 115.63237691065389 },
    conditions: [
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Andrew Stepson",
    age: 6,
    latlng: { lat: -33.39991021231199, lng: 115.61657333506865 },
    conditions: [],
  },
  {
    fullname: "Wendy Pursue",
    age: 44,
    latlng: { lat: -33.39985647056572, lng: 115.61859035612575 },
    conditions: [
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Hillary Standwich",
    age: 52,
    latlng: { lat: -33.40171949846183, lng: 115.61566138400165 },
    conditions: [
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "Fred Hollows",
    age: 61,
    latlng: { lat: -33.4025614306157, lng: 115.61951303591388 },
    conditions: [
      {
        name: "COPD",
      },
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "Drake Mancell",
    age: 40,
    latlng: { lat: -33.40165680105662, lng: 115.60962104939105 },
    conditions: [
      {
        name: "Rheumatic Heart Disease",
      },
    ],
  },
  {
    fullname: "Nancy Barlow",
    age: 84,
    latlng: { lat: -33.39730369936098, lng: 115.60692811149008 },
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
    fullname: "Frankland Buddy",
    age: 2,
    latlng: { lat: -33.34731698349092, lng: 115.63144350234799 },
    conditions: [
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Paddy Linch",
    age: 28,
    latlng: { lat: -33.34541693980345, lng: 115.62994146539057 },
    conditions: [
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Paul Mutch",
    age: 51,
    latlng: { lat: -33.3462056422165, lng: 115.62599325395966 },
    conditions: [
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Betty White",
    age: 95,
    latlng: { lat: -33.632925262068476, lng: 115.38781309250193 },
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
    fullname: "Tom Cruise",
    age: 55,
    latlng: { lat: -33.63660552255094, lng: 115.38785600784357 },
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
    fullname: "Peter Fitzo",
    age: 29,
    latlng: { lat: -33.63703428053393, lng: 115.37854337870762 },
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
    fullname: "Paddy O'leary",
    age: 12,
    latlng: { lat: -33.63038829191869, lng: 115.39390707101487 },
    conditions: [
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Brad Cummins",
    age: 88,
    latlng: { lat: -33.63732011800332, lng: 115.37772798721645 },
    conditions: [
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Peter Watts",
    age: 78,
    latlng: { lat: -33.6490743620745, lng: 115.35438204136413 },
    conditions: [
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Amelia Peters",
    age: 5,
    latlng: { lat: -33.64346539410728, lng: 115.36927366491331 },
    conditions: [
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "Beck Smith",
    age: 20,
    latlng: { lat: -33.644751559181046, lng: 115.36236429490923 },
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
    fullname: "DJ Shadow",
    age: 49,
    latlng: { lat: -33.64510882384713, lng: 115.35343790384803 },
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
    fullname: "Getcho Mans",
    age: 27,
    latlng: { lat: -33.66511327911019, lng: 115.31365537908707 },
    conditions: [
      {
        name: "Rheumatic Heart Disease",
      },
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "Killa Mike",
    age: 40,
    latlng: { lat: -33.65759495667251, lng: 115.25761394430542 },
    conditions: [
      {
        name: "COPD",
      },
    ],
  },
  {
    fullname: "Paul McGillan",
    age: 42,
    latlng: { lat: -33.673096565286734, lng: 115.24220733645132 },
    conditions: [
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Andy McGillan",
    age: 12,
    latlng: { lat: -33.673096565286734, lng: 115.24220733645132 },
    conditions: [
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "Peter Pauls",
    age: 4,
    latlng: { lat: -33.61096174021325, lng: 115.10726913054827 },
    conditions: [
      {
        name: "COPD",
      },
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Michael Priest",
    age: 47,
    latlng: { lat: -33.61551854075463, lng: 115.09965165740714 },
    conditions: [
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Anders Wince",
    age: 28,
    latlng: { lat: -33.6143927653805, lng: 115.10001643781106 },
    conditions: [
      {
        name: "Diabetes",
      },
    ],
  },
  {
    fullname: "John McGrath",
    age: 48,
    latlng: { lat: -33.61478589495983, lng: 115.10235532393045 },
    conditions: [
      {
        name: "Rheumatic Heart Disease",
      },
    ],
  },
  {
    fullname: "MCA Grand Master",
    age: 52,
    latlng: { lat: -33.62150455963913, lng: 115.11673196337998 },
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
    fullname: "Happy Gilmore",
    age: 50,
    latlng: { lat: -33.59734351227538, lng: 115.09881480760471 },
    conditions: [
      {
        name: "COPD",
      },
    ],
  },
  {
    fullname: "Mick Jaggs",
    age: 68,
    latlng: { lat: -33.59541319575852, lng: 115.08660539290804 },
    conditions: [
      {
        name: "COPD",
      },
      {
        name: "Rheumatic Heart Disease",
      },
      {
        name: "Cancer",
      },
    ],
  },
  {
    fullname: "Freddy Mercury",
    age: 85,
    latlng: { lat: -33.57878923791636, lng: 115.080683075385 },
    conditions: [
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Pink Frankles",
    age: 94,
    latlng: { lat: -33.56251968425904, lng: 115.06441815998883 },
    conditions: [
      {
        name: "COPD",
      },
    ],
  },
  {
    fullname: "Mandy Moore",
    age: 101,
    latlng: { lat: -33.55962302473741, lng: 115.05441888538664 },
    conditions: [
      {
        name: "Cancer",
      },
      {
        name: "Diabetes",
      },
      {
        name: "COPD",
      },
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Eboneiser Max",
    age: 61,
    latlng: { lat: -33.55468775142845, lng: 115.06175740880711 },
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
    fullname: "Mal Painindaass",
    age: 82,
    latlng: { lat: -33.65023166177415, lng: 115.06167157798872 },
    conditions: [
      {
        name: "Cancer",
      },
      {
        name: "Joints",
      },
    ],
  },
  {
    fullname: "Taj Burrows",
    age: 99,
    latlng: { lat: -33.6423719643593, lng: 115.02785428877615 },
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
        name: "COPD",
      },
    ],
  },
];
