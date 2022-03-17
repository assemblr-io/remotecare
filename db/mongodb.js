const { NextPlan } = require("@mui/icons-material");

const mongoose = require("mongoose"),
  Admin = mongoose.mongo.Admin;
const ApiError = require;

//mongoDB Class
class MongoDB {
  constructor() {
    this.uri = `mongodb+srv://${process.env.REMOTEMONGO_UID}:${process.env.REMOTEMONGO_PWD}@carecluster.byivh.mongodb.net/carecluster?retryWrites=true&w=majority`;
  }
  //connect to MongoDB Atlas Instance
  async connect() {
    try {
      await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((MongooseNode) => {
        const nativeConnection = MongooseNode.connections[0];
        new Admin(nativeConnection.db).listDatabases((err, result) => {
          console.log("Successfully Connected to MongoDB - carecluster");
        });
      });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = MongoDB;
