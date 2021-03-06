const RelayAdeDevModel = require("../models/RelayAdeDevModel");
const clientMqqt = require("../mqtt");

const getRelayAdeDevById = (req, res) => {
  RelayAdeDevModel.findById(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Something went wrong!" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
const getAllRelayAdeDev = (req, res) => {
  try {
    RelayAdeDevModel.find(req.query)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "Something went wrong!" });
        }
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ message: err.message });
      });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updateRelayAdeDev = (req, res) => {
  const id = req.params.id;
  RelayAdeDevModel.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json("Something went wrong!");
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
const createRelayAdeDev = (req, res) => {
  try {
    RelayAdeDevModel.create(req.body)
      .then((data) => {
        if (data) {
          res.status(201).json(data);
        } else {
          res.status(404).json("Something went wrong");
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteRelayAdeDev = (req, res) => {

  clientMqqt.publish("mybk/smarthome/upstream", "Hello mqtt");
  clientMqqt.on("message", function (topic, message) {
    setTimeout(() => {
      RelayAdeDevModel.findByIdAndUpdate(req.params.id, {room_id: null})
    .then((data) => {
      if (data) {
        res.status(200).json("Delete success");
      } else {
        res.status(404).json({ message: "Something went wrong!" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
    }, 1000);
  })

  
};

const RelayAdeDevController = {
  getRelayAdeDevById,
  getAllRelayAdeDev,
  deleteRelayAdeDev,
  createRelayAdeDev,
  updateRelayAdeDev,
};

module.exports = RelayAdeDevController;
