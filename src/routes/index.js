const {Router} = require("express")

const usersRouter = require("./users.routes")
const sessionsRouter = require("./sessions.routes")
const foodsRouter = require("./foods.routes")
const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/foods", foodsRouter)

module.exports = routes