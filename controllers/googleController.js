const googleDistanceService = require("../models/distance");
const ApiError = require("../errors/ApiError");

exports.distance_service = async function (req, res, next) {
  try {
    if (!Object.keys(req.query).length) {
      return next(ApiError.badRequest("query values are mal-formed"));
    }
    const result = await googleDistanceService.getDistances(req.query);
    res.status(200).json({ data: result });
  } catch (error) {
    return next(error);
  }
};
