const Express = require("express")
const mongoose = require("mongoose")
const UserRouter = require("./routers/UserRouter")
const RoomRouter = require("./routers/RoomRouter")
const SensorRouter = require("./routers/SensorRouter")
const Relay3ChannelRouter = require("./routers/Relay3ChannelRouter")
const RelayAdeDevRouter = require("./routers/RelayAdeDevRouter")
const SensorModel = require("./models/SensorModel")
const RelayAdeDevModel = require("./models/RelayAdeDevModel")
const http = require("http")

const clientMqtt = require('./mqtt')


// init app
const cors = require("cors")
const { Server } = require("socket.io")
require('./mqtt')
const app = Express()

app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
const PORT = 5000

// setup router
app.use("/api/v1/user", UserRouter)
app.use("/api/v1/rooms", RoomRouter)
app.use("/api/v1/relay3channel", Relay3ChannelRouter)
app.use("/api/v1/sensors", SensorRouter)
app.use("/api/v1/relayadedev", RelayAdeDevRouter)

// mqtt


app.get('/api/v1/open-device', (req, res) =>{
    clientMqtt.publish('mybk/smarthome/upstream', 'Hello mqtt')
    res.json({"message": "ok"})
})


app.get("/api/v1/user/logout", (req, res) => res.send("OK"))
// connect database
const MONGO_URL =
  "mongodb+srv://phuthien007:Thienphu1@cluster0.mhggu.mongodb.net/iot-web"
mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, success) => {
    if (err) {
      console.log("Connected failed. Something went wrong!")
    }
    if (success) {
      console.log("Connected successfully!")
    }
  }
)

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
  },
})



let interval

const getAllSensor = (socket) => {
  SensorModel.find({})
    .then((data) => {
      socket.emit("sensor", data)
    })
    .catch((err) => {
      console.log(err)
    })
}

const getAllRelayAdeDev = (socket) => {
  RelayAdeDevModel.find({})
    .then((data) => {
      socket.emit("relayadedev", data)
    })
    .catch((err) => {
      console.log(err)
    })
}

const randomDataRelayAdeDev = (socket) => {
  
  const data1 = Math.random(12, 220)
  const data2 = Math.random(0, 10)
  const data3 = Math.random(0, 10)
  socket.emit("chart_relayadedev", {
    data1,data2, data3
  })
}

const randomDataSensor = (socket) => {
  const data1 = Math.random(0, 50)
  const data2 = Math.random(30, 100)
  const data3 = Math.random(0, 100)
  socket.emit("chart_sensor", {
    data1,data2, data3
  })
   
}

io.on("connection", (socket) => {
  console.log("New client connected")
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getAllSensor(socket), 1000)
  interval = setInterval(() => getAllRelayAdeDev(socket), 1000)
  interval = setInterval(() => randomDataSensor(socket), 1000)
  interval = setInterval(() => randomDataRelayAdeDev(socket), 1000)
  socket.on("disconnect", () => {
    console.log("Client disconnected")
    clearInterval(interval)
  })
})

server.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))
