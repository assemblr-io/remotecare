const { NextPlan } = require("@mui/icons-material");

const mongoose = require("mongoose"),
  Admin = mongoose.mongo.Admin;
const ApiError = require;

//DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7 - pre-empting this.
mongoose.set('strictQuery', false);

//mongoDB Class - not currently using environments but built in anyhow
class MongoDB {
  constructor(env = "") {
    (this.env = env),
      (this.uri = `mongodb+srv://${process.env.REMOTEMONGO_UID}:${process.env.REMOTEMONGO_PWD}@carecluster.byivh.mongodb.net/${env}carecluster?retryWrites=true&w=majority`);
  }

  //connect to MongoDB Atlas Instance
  async connect() {
    try {
      const response = await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
      if (response) return `Successfully Connected to MongoDB - ${this.env}carecluster`;
    } catch (err) {
      return err;
    }
  }

  async dropCollection(collection) {
    return await mongoose.connection.db.dropCollection(collection);
  }

  mongoose_instance() {
    return mongoose;
  }

  async close() {
    try {
      const response = await mongoose.connection.close();
      if (response) return "Connection closed successfully";
    } catch (err) {
      return err;
    }
  }
}

module.exports = MongoDB;
