const { Router } = require("express")
const TagsController = require("../controllers/TagsController")

const tagsRoutes = Router()
const tagsController = new TagsController()

tagsRoutes.get("/foods", tagsController.foodTags)
tagsRoutes.get("/drinks", tagsController.drinkTags)
tagsRoutes.get("/desserts", tagsController.dessertTags)

module.exports = tagsRoutes