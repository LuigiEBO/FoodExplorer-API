const { query } = require("express")
const knex = require("../database/knex")
const appError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")
class FoodsController {
  async mainDishes(request, response) {
    const { name, price, description } = request.body

    await knex("foods").insert({ name, price, description })

    return response.status(201).json()
  }
  async desserts(request, response) {
    const { name, price, description } = request.body

    await knex("desserts").insert({ name, price, description })

    return response.status(201).json()
  }
  async drinks(request, response) {
    const { name, price, description } = request.body

    await knex("drinks").insert({ name, price, description })

    return response.status(201).json()
  }
  async index(request, response) {
    const { name } = request.query
    let foods
    let drinks
    let desserts

    foods = await knex("foods").whereLike("name", `%${name}%`).orderBy("name")
    drinks = await knex("drinks").whereLike("name", `%${name}%`).orderBy("name")
    desserts = await knex("desserts")
      .whereLike("name", `%${name}%`)
      .orderBy("name")

    const resultFoods = foods.map((food) => {
      return {
        ...food,
      }
    })
    const resultDrinks = drinks.map((drink) => {
      return {
        ...drink,
      }
    })
    const resultDesserts = desserts.map((dessert) => {
      return {
        ...dessert,
      }
    })

    return response.json([resultFoods, resultDrinks, resultDesserts])
  }
  async show(request, response) {
    const { name } = request.query
    let foods

    foods = await knex("foods").where({ name })
    const resultFoods = foods.map((food) => {
      return {
        ...food,
      }
    })
    return response.json(resultFoods)
  }
  async showDrink(request, response) {
    const { name } = request.query
    let drinks

    drinks = await knex("drinks").where({ name })
    const resultDrinks = drinks.map((drink) => {
      return {
        ...drink,
      }
    })
    return response.json(resultDrinks)
  }
  async showDessert(request, response) {
    const { name } = request.query
    let desserts

    desserts = await knex("desserts").where({ name })
    const resultDesserts = desserts.map((dessert) => {
      return {
        ...dessert,
      }
    })
    return response.json(resultDesserts)
  }
  async delete(request, response) {
    const { id } = request.query

    await knex("foods").where({ id }).delete()
    await knex("drinks").where({ id }).delete()
    await knex("desserts").where({ id }).delete()

    return response.json(`${id} excluido`)
  }
  async update(request, response) {
    const {type, id} = request.query
    const {name, price, description} = request.body
   
     const database = await sqliteConnection()
     const food = await database.get(`SELECT * FROM ${type} WHERE id = (?)`, [id])

     food.name = name ?? food.name
     food.price = price ?? food.price
     food.description = description ?? food.description

     await database.run(
      `UPDATE ${type} SET
      name = ?,
      price = ?,
      description = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [food.name, food.price, food.description, id]
    )
  return response.status(200).json();
  }
}

module.exports = FoodsController
