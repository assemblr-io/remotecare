const mongoose = require("mongoose");
const { Schema } = mongoose;

const PatientSchema = new Schema({
  fullname: String,
  email: String,
  age: Number,
  full_address: String,
  address_locality: String,
  address_latlng: { lat: Number, lng: Number },
  conditions: Object,
  appointments: Object,
});

module.exports = {
  PatientSchema,
};
