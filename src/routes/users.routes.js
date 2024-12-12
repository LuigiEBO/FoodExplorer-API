const {Router} = require("express")

const UsersController = require("../controllers/UsersControler")
const usersRouter = Router()

const userscontroller = new UsersController()

usersRouter.post("/", userscontroller.create)

module.exports = usersRouter