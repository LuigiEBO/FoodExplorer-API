const knex = require("../database/knex")
const appError = require("../utils/AppError")
const DiskStorage = require("../providers/diskStorage")

class FoodImgController {
  async update(request, response) {
    const { nameFood } = request.params
    const imgFileName = request.file.filename

    const diskstorage = new DiskStorage()

    const food = await knex("foods").where({ name: nameFood }).first()

    if (!food) {
      throw new appError("Esse prato não existe")
    }
    if (food.avatar) {
      await diskstorage.deleteFile(food.avatar)
    }

    const filename = await diskstorage.saveFile(imgFileName)
    food.avatar = filename

    await knex("foods").update(food).where({ name: nameFood })

    return response.json(food)
  }
  async updateDrink(request, response) {
    const { nameDrink } = request.params
    const imgFileName = request.file.filename

    const diskstorage = new DiskStorage()

    const drink = await knex("drinks").where({ name: nameDrink }).first()

    if (!drink) {
      throw new appError("Esse prato não existe")
    }
    if (drink.avatar) {
      await diskstorage.deleteFile(drink.avatar)
    }

    const filename = await diskstorage.saveFile(imgFileName)
    drink.avatar = filename

    await knex("drinks").update(drink).where({ name: nameDrink })

    return response.json(drink)
  }
  async updateDessert(request, response) {
    const { nameDessert } = request.params
    const imgFileName = request.file.filename

    const diskstorage = new DiskStorage()

    const dessert = await knex("desserts").where({ name: nameDessert }).first()

    if (!dessert) {
      throw new appError("Esse prato não existe")
    }
    if (dessert.avatar) {
      await diskstorage.deleteFile(dessert.avatar)
    }

    const filename = await diskstorage.saveFile(imgFileName)
    dessert.avatar = filename

    await knex("desserts").update(dessert).where({ name: nameDessert })

    return response.json(dessert)
  }
}

module.exports = FoodImgController
