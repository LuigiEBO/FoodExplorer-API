const { response } = require("express")
const appError = require("../utils/AppError")
function verifyUserVerification(roleToVerify) {
  return (request, response, next) => {
    const {role} = request.user 
    if(!roleToVerify.includes(role)) {
      throw new appError("Unauthorized", 401)
    }

    return next();
  }
}

module.exports = verifyUserVerification