const MongoDB = require("../db/mongodb");
const mongo = new MongoDB("test_");
const mongoose = require("mongoose");
const test_patients = require("../db/patient_test_data");
const { Patients, bulk_patient_load } = require("../models/patients");
const request = require("supertest");
const express = require("express");
const router = require("../routes/api");
const patient = require("../models/patients");

const app = new express();
app.use("/", router);
let collection_to_test;

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

describe("testing Express route handlers and patient model", () => {
  test("responds to GET /", async () => {
    const res = await request(app).get("/");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual("not implemented");
  });

  test("responds to /missing_route", async () => {
    const res = await request(app).get("/missing_route");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(404);
  });

  test("responds to GET patient markers for map /", async () => {
    patient.getPatientMarkers = jest.fn().mockReturnValue(test_patients.data);

    const res = await request(app).get("/patient/markers").query("ageMin=0&ageMax=115&latNE=1&latSW=2&lngNE=3&lngSW=4");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(JSON.stringify(test_patients.data));
  });

  test("responds to POST /patient/bulk with and without data", async () => {
    const starting_count = test_patients.data.length;
    Patients.insertMany = jest.fn().mockReturnValue(test_patients.data.length);

    expect(await bulk_patient_load(test_patients.data)).toBe(starting_count);
    await expect(bulk_patient_load()).rejects.toThrowError();
  });
});
