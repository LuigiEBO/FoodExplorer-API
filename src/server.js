require("express-async-errors")
require("dotenv/config")
const express = require("express")
const app = express()
const appError = require("./utils/AppError");
const routes = require("./routes");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const uploadConfig = require("./config/upload")

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)
app.use((error, request, response, next) => {
  if (error instanceof appError) {
    return response.status(error.statuscode).json({
      status: "error",
      message: error.message
    })
  }

  console.log(error)

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  })
})
const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server is running on port ${PORT} `))