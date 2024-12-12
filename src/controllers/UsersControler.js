const knex = require("../database/knex");
const {hash} = require("bcryptjs");
const appError = require("../utils/AppError");

class UsersController {
  async create (request, response) {
    const { name, password, email} = request.body;

    const checkIfUserExists = await knex("users").where({email})
    if(checkIfUserExists.length > 0) {
      throw new appError("Esse Email ja está em uso")
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({email, name, password:hashedPassword});
    
    return response.status(201).json()
  }
}

module.exports = UsersController