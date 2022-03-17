const { ViewModuleSharp, Api } = require("@mui/icons-material");

class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiError(400, "(Error 400) " + msg);
  }

  static noResource(msg) {
    return new ApiError(404, "(Error 404) " + msg);
  }
}
module.exports = ApiError;
