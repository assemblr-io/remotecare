const express = require("express");
const path = require("path");
const logger = require("morgan");
const MongoDB = require("./db/mongodb");
const PORT = process.env.PORT || 2020;
const mongo = new MongoDB();
const cors = require("cors");
const apiErrorHandler = require("./errors/api_error_handler");
const test_patients = require("./db/patient_test_data");

//import routes
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const ApiError = require("./errors/ApiError");
const mongoSanitize = require("express-mongo-sanitize");
const { CropLandscapeOutlined } = require("@mui/icons-material");

//create the express app object
const app = express();

//connect to mongoDB
mongo.connect().then((res) => console.log(res));
console.log(test_patients);
//app port listener
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

//set up middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());
app.use(cors());

//assign route handling
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.all("*", (req, res, next) => {
  next(ApiError.noResource(`Can't find ${req.originalUrl} on this Server!`));
});

app.use(apiErrorHandler);

module.exports = {
  app,
  mongo,
};
