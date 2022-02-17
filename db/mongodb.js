const mongoose = require("mongoose"),
  Admin = mongoose.mongo.Admin;

//mongoDB Class
class MongoDB {
  constructor() {
    this.uri = `mongodb+srv://${process.env.REMOTEMONGO_UID}:${process.env.REMOTEMONGO_PWD}@carecluster.byivh.mongodb.net/carecluster?retryWrites=true&w=majority`;
  }

  //connect to MongoDB Atlas Instance
  async connect() {
    console.log(this.uri);
    //make async call with arrow fucntion format.
    await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((MongooseNode) => {
      const nativeConnection = MongooseNode.connections[0];
      // connection established - use the Admin object grabbed above in the require
      new Admin(nativeConnection.db).listDatabases((err, result) => {
        console.log("Successfully Connected to MongoDB - carecluster");
      });
    });
  }
}

module.exports = MongoDB;
