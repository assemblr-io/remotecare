const { after } = require("underscore");
const MongoDB = require("../db/mongodb");
const mongo = new MongoDB("test_");
const mongoose = require("mongoose");
const patient_schema = require("../db/schemas/patient.schema");
const test_patients = require("../db/patient_test_data");
const Patients = mongoose.model("patients", patient_schema.PatientSchema);
const request = require('supertest');
const express = require('express');
const router = require('../routes/api');

const app = new express();
app.use('/', router);
let collection_to_test ;

describe("testing MongoDB connection", () => {
  let db;
  collection_to_test = "patients";

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

  test('responds to GET /', async () => {
    const res = await request(app).get('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('not implemented');
  });
  
  test('responds to /missing_route', async () => {
    const res = await request(app).get('/missing_route');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });

  // test('responds to POST /patient/bulk', async () => {
  //   const starting_count = test_patients.data.length

  //   const res = await request(app).post('/patient/bulk').send(test_patients.data)
  //   expect(res.header['content-type']).toBe('text/html; charset=utf-8');
  //   expect(res.statusCode).toBe(200);
  // });

});

// describe("testing Controllers", () => {});

// describe("testing Models", () => {});
