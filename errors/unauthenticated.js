const CustomAPIError = require("./custom-api.js")

class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = 403
  }
}

module.exports = UnAuthenticatedError
