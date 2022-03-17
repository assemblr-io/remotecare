const ApiError = require("./ApiError");

const apiErrorHandler = (err, req, res, next) => {
  // set locals, only providing error in development and only console log it while in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? (err, console.error(err)) : {};

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  } else {
    res.status(500).json("(Error 500) undefined server error: " + err.message);
  }
};

module.exports = apiErrorHandler;
