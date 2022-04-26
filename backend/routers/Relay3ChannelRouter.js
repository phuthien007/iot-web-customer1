const Express = require("express");
const router = Express.Router();
const Relay3ChannelController = require("../controllers/Relay3ChannelController");
const Relay3ChannelModel = require("../models/Relay3ChannelModel");
const jwt = require("jsonwebtoken");
const { checkLogin } = require("../middleware/auth");


// router.use(checkLogin);

// getall Relay3Channel
router.get("/", Relay3ChannelController.getAllRelay3Channel);


// get not in room
router.get("/not-room", (req, res) => {
    try {
      Relay3ChannelModel.find({ room_id: null})
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
// create Relay3Channel
router.post("/",  Relay3ChannelController.createRelay3Channel);


// get Relay3Channel by id
router.get("/:id", Relay3ChannelController.getRelay3ChannelById);

// update Relay3Channel
router.patch("/:id", Relay3ChannelController.updateRelay3Channel);

// delete Relay3Channel
router.delete("/:id", Relay3ChannelController.deleteRelay3Channel);

module.exports = router;
