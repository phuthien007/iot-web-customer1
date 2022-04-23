const Express= require('express')
const mongoose = require('mongoose')
const UserRouter = require('./routers/UserRouter')
const RoomRouter = require('./routers/RoomRouter')
const SensorRouter = require('./routers/SensorRouter')
const Relay3ChannelRouter = require('./routers/Relay3ChannelRouter')
const RelayAdeDevRouter = require('./routers/RelayAdeDevRouter')
// init app
const app = Express()
app.use(Express.json())
app.use(Express.urlencoded({extended: true}))
const PORT = 5000

// setup router
app.use("/api/v1/user", UserRouter)
app.use("/api/v1/rooms", RoomRouter)
app.use("/api/v1/relay3channel", Relay3ChannelRouter)
app.use("/api/v1/sensors", SensorRouter)
app.use("/api/v1/relayadedev", RelayAdeDevRouter)


// connect database
const MONGO_URL = "mongodb+srv://phuthien007:Thienphu1@cluster0.mhggu.mongodb.net/iot-web"
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true},  (err,success)=>{
    if(err){
        console.log("Connected failed. Something went wrong!")
    }  
    if(success){
        console.log("Connected successfully!")
    }
})


app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))