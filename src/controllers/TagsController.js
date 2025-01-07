const knex = require("../database/knex")

class TagsController {
  async foodTags(request, response) {
    const {id} = request.query
    const tags = await knex("tagsFoods").whereLike("food_id", `${id}`).groupBy("name")
    return response.json(tags)
  }
  async drinkTags(request, response) {
    const {id} = request.query
    const tags = await knex("tagsDrinks").whereLike("drink_id", `${id}`).groupBy("name")

    return response.json(tags)
  }
  async dessertTags(request, response) {
    const {id} = request.query
    console.log(id)
    const tags = await knex("tagsDesserts").whereLike("dessert_id", `${id}`).groupBy("name")

    return response.json(tags)
  }
}

module.exports = TagsController
