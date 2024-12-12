const {compare} = require("bcryptjs")
const {sign} = require("jsonwebtoken")
const knex = require("../database/knex")
const authConfig = require("../config/auth")
const appError = require("../utils/AppError")
class SessionsController {
  async create(request, response) {
    const {email, password} = request.body;

    const user = await knex("users").where({email}).first();

    if(!user) {
      throw new appError("Email e/ou Senha incorreta", 401)
    }

    const matchedPassword = await compare(password, user.password);

    if(!matchedPassword) {
      throw new appError("Email e/ou Senha incorreta", 401)
    }

    const {secret, expiresIn} = authConfig.jwt;
    const token = sign({role: user.role}, secret, {
      subject: String(user.id),
      expiresIn,
    });
    
    delete user.password
    response.status(201).json({ user, token })
  }
}

module.exports = SessionsController