const mongoose = require("mongoose");
const { Schema } = mongoose;

const PatientSchema = new Schema(
  {
    _id: mongoose.Types.ObjectId,
    fullname: String,
    age: Number,
    latlng: {},
    conditions: [],
  },
  { strict: false }
);

module.exports = {
  PatientSchema,
};
