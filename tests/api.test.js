const { after } = require("underscore");
const MongoDB = require("../db/mongodb");
const mongo = new MongoDB("test_");
const patients_model = require("../models/patients");
const the_goose = mongo.mongoose_instance();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const patient_schema = require("../db/schemas/patient.schema");
const test_patients = require("../db/patient_test_data");
const Patients = mongoose.model("patients", patient_schema.PatientSchema);

describe("testing MongoDB connection", () => {
  let db;
  const collection_to_test = "patients";

  beforeAll(async () => {
    db = await mongo.connect();
  });

  afterAll(async () => {
    await mongo.dropCollection(collection_to_test);
    await mongo.close();
  });

  test("connect to mongoDB", async () => {
    expect(db).toEqual("Successfully Connected to MongoDB - test_carecluster");
  });

  test("Patients schema and MongoDB simple transaction", async () => {
    const id = new mongoose.Types.ObjectId();
    const mockPatient = {
      _id: id,
      fullname: "Bradley Dawson",
      age: 80,
      latlng: { lat: -33.32896907410054, lng: 115.64462924197821 },
      conditions: [
        {
          name: "Cancer",
        },
      ],
    };
    await Patients.create(mockPatient);
    const insertedPatient = await Patients.findOne({ _id: id }).lean().exec();
    expect(mockPatient).toEqual(insertedPatient);
  });

  test("Patients schema and MongoDB many transactions", async () => {
    const starting_count = test_patients.data.length + 1;
    await Patients.insertMany(test_patients.data);
    const insertedPatients = await Patients.find().count().exec();
    expect(starting_count).toEqual(insertedPatients);
  });
});

describe("testing Express route handlers", () => {
  beforeAll(async () => {
    db = await mongo.connect();
  });

  afterAll(async () => {
    await mongo.dropCollection(collection_to_test);
    await mongo.close();
  });
});

// describe("testing Controllers", () => {});

// describe("testing Models", () => {});
