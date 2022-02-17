const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const MongoDB = require("./db/mongodb");
const PORT = process.env.PORT || 2020;
const mongo = new MongoDB();
const cors = require("cors");

//import routes
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

//create the express app object
const app = express();

//postgres database
// const { Pool, Client } = require("pg");
// const pool = new Pool({
//   database: "default",
// });

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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//export so the app can be used anywhere with a require.
module.exports = {
  app,
  mongo,
};
