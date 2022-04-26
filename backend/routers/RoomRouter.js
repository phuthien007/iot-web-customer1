const Express = require("express");
const router = Express.Router();
const RoomController = require("../controllers/RoomController");
const RoomModel = require("../models/RoomModel");
const jwt = require("jsonwebtoken");
const { checkLogin } = require("../middleware/auth");


// router.use(checkLogin);

// getall Room
router.get("/", RoomController.getAllRoom);


// create Room
router.post("/",  RoomController.createRoom);


// get Room by id
router.get("/:id", RoomController.getRoomById);

// update Room
router.patch("/:id", RoomController.updateRoom);

// delete Room
// getall Room
router.delete("/:id", RoomController.deleteRoom);

module.exports = router;
