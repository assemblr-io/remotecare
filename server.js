const express = require("express");
const path = require("path");
const logger = require("morgan");
const MongoDB = require("./db/mongodb");
const PORT = process.env.PORT || 2020;
const mongo = new MongoDB();
const cors = require("cors");
const apiErrorHandler = require("./errors/api_error_handler");

//import routes
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

//create the express app object
const app = express();

//connect to mongoDB
mongo.connect();

//app port listener
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

//set up middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//assign route handling
app.use("/", indexRouter);
app.use("/api", apiRouter);

app.use(apiErrorHandler);

module.exports = {
  app,
  mongo,
};
