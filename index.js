require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const http = require("http").createServer(app)
// const refreshTokenRouter = require("./routes/refreshTokenRoutes")
const cookieParser = require("cookie-parser")
const connectDB = require("./db/connect")

require("express-async-errors")
// const auth = require("./middleware/authenticate")

const { dirname } = require("path")
const { fileURLToPath } = require("url")
const path = require("path")

const url = process.env.URL

app.use(cookieParser())
app.use(cors())

app.use(express.json())

// middleware
const notFoundMiddleware = require("./middleware/not-found.js")
const errorHandlerMiddleware = require("./middleware/error-handler.js")
// const checkPermissions = require("./utils/checkPermissions")

// routers
const signinRouter = require("./routers/signinRouter")
const userRouter = require("./routers/userRouter")
const refreshTokenRouter = require("./routers/refreshTokenRouter")
// const userRouter = require("./routes/userRouter")
// const permissionRouter = require("./routes/permissionRouter")

app.use(bodyParser.json())
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, "../client/build")))

app.get("/", (req, res) => {
  res.send("home")
})
app.use("/api/v1/signin", signinRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/refreshToken", refreshTokenRouter)
// app.use("/api/v1/permission", auth, checkPermissions, permissionRouter)

// only when ready to deploy
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    http.listen(port, () => {
      console.log(`Server listening on ${port}`)
    })
  } catch (error) {
    // console.log(error)
  }
}

start()
