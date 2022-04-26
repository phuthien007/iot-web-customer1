const Express = require("express");
const router = Express.Router();
const RelayAdeDevController = require("../controllers/RelayAdeDevController");
const RelayAdeDevModel = require("../models/RelayAdeDevModel");
const jwt = require("jsonwebtoken");
const { checkLogin } = require("../middleware/auth");


// router.use(checkLogin);

// getall RelayAdeDev
router.get("/", RelayAdeDevController.getAllRelayAdeDev);


// get not in room
router.get("/not-room", (req, res) => {
    try {
      RelayAdeDevModel.find({ room_id: null})
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
// create RelayAdeDev
router.post("/",  RelayAdeDevController.createRelayAdeDev);


// get RelayAdeDev by id
router.get("/:id", RelayAdeDevController.getRelayAdeDevById);

// update RelayAdeDev
router.patch("/:id", RelayAdeDevController.updateRelayAdeDev);

// delete RelayAdeDev
// getall RelayAdeDev
router.delete("/:id", RelayAdeDevController.deleteRelayAdeDev);

module.exports = router;
