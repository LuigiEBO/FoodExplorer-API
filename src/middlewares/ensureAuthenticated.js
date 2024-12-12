const {verify} = require("jsonwebtoken")
const appError = require("../utils/AppError")
const authConfig = require("../config/auth")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization
  if(!authHeader) {
    throw new appError("JWT token não informado")
  }

  const [, token] = authHeader.split(" ")

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id),
      role,
    }

    return next()
  } catch {
    throw new appError("Invalid JWT token", 401)
  }
}

module.exports = ensureAuthenticated