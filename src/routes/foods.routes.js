const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../config/upload")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserVerification = require("../middlewares/verifyUserAutorization")
const FoodsController = require("../controllers/FoodsController")
const FoodsImgController = require("../controllers/FoodImgController")
const foodsRouter = Router()

const upload = multer(uploadConfig.MULTER)

const foodsController = new FoodsController()
const foodImgController = new FoodsImgController()
foodsRouter.use(ensureAuthenticated)

foodsRouter.post("/main", verifyUserVerification("admin"), foodsController.mainDishes)
foodsRouter.post("/drink", verifyUserVerification("admin"), foodsController.drinks)
foodsRouter.post("/dessert", verifyUserVerification("admin"), foodsController.desserts)
foodsRouter.put(
  "/update",
  verifyUserVerification("admin"),
  foodsController.update
)
foodsRouter.get("/", foodsController.index)
foodsRouter.get("/show", foodsController.show)
foodsRouter.get("/showDrink", foodsController.showDrink)
foodsRouter.get("/showDessert", foodsController.showDessert)
foodsRouter.delete("/delete", verifyUserVerification("admin"), foodsController.delete)
foodsRouter.patch("/mainImg/:nameFood", verifyUserVerification("admin"), upload.single("img"), foodImgController.update)
foodsRouter.patch("/drinkImg/:nameDrink",verifyUserVerification("admin"),upload.single("img"),foodImgController.updateDrink)
foodsRouter.patch("/dessertImg/:nameDessert", verifyUserVerification("admin"), upload.single("img"),foodImgController.updateDessert
)

module.exports = foodsRouter
