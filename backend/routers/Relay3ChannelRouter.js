const Express = require("express");
const router = Express.Router();
const Relay3ChannelController = require("../controllers/Relay3ChannelController");
const Relay3ChannelModel = require("../models/Relay3ChannelModel");
const jwt = require("jsonwebtoken");
const { checkLogin } = require("../middleware/auth");


router.use(checkLogin);

// getall Relay3Channel
router.get("/", Relay3ChannelController.getAllRelay3Channel);


// create Relay3Channel
router.post("/",  Relay3ChannelController.createRelay3Channel);


// get Relay3Channel by id
router.get("/:id", Relay3ChannelController.getRelay3ChannelById);

// update Relay3Channel
router.patch("/:id", Relay3ChannelController.updateRelay3Channel);

// delete Relay3Channel
router.delete("/:id", Relay3ChannelController.deleteRelay3Channel);

module.exports = router;
