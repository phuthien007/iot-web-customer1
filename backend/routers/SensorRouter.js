const Express = require("express");
const router = Express.Router();
const SensorController = require("../controllers/SensorController");
const SensorModel = require("../models/SensorModel");
const jwt = require("jsonwebtoken");
const { checkLogin } = require("../middleware/auth");

// router.use(checkLogin);

// getall Sensor
router.get("/", SensorController.getAllSensor);

// get not in room
router.get("/not-room", (req, res) => {
  try {
    SensorModel.find({ room_id: null})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(500).json(err);
  }
});

// create Sensor
router.post("/", SensorController.createSensor);

// get Sensor by id
router.get("/:id", SensorController.getSensorById);

// update Sensor
router.patch("/:id", SensorController.updateSensor);

// delete Sensor
// getall Sensor
router.delete("/:id", SensorController.deleteSensor);

module.exports = router;
