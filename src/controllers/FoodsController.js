const { query } = require("express")
const knex = require("../database/knex")
const appError = require("../utils/AppError")

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
    console.log(name)
    let foods

    foods = await knex("foods").where({ name })
    const resultFoods = foods.map((food) => {
      return {
        ...food,
      }
    })
    console.log(resultFoods)
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
    const { name } = request.body

    await knex("foods").where({ name }).delete()
    await knex("drinks").where({ name }).delete()
    await knex("desserts").where({ name }).delete()

    return response.json(`${name} excluido`)
  }
}

module.exports = FoodsController
