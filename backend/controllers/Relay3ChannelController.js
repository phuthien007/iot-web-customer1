const Relay3ChannelModel = require("../models/Relay3ChannelModel");
const clientMqqt = require("../mqtt");

const getRelay3ChannelById = (req, res) => {
  Relay3ChannelModel.findById(req.params.id)
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
const getAllRelay3Channel = (req, res) => {
  try {
    Relay3ChannelModel.find(req.query)
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
const updateRelay3Channel = (req, res) => {
  const id = req.params.id;
  clientMqqt.publish("mybk/smarthome/upstream", "Hello mqtt");
  clientMqqt.on("message", function (topic, message) {
    // message is Buffer
    setTimeout(() => {
      Relay3ChannelModel.findByIdAndUpdate(id, req.body, { new: true }).then(
        (data) => {
          if (data) {
            res.status(200).json(data);
          } else {
            res.status(400).json("Something went wrong!");
          }
        },
        1000
      );
    }).catch((err) => {
      res.status(500).json(err);
    });
  });
};
const createRelay3Channel = (req, res) => {
  try {
    Relay3ChannelModel.create(req.body)
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
const deleteRelay3Channel = (req, res) => {
  clientMqqt.publish("mybk/smarthome/upstream", "Hello mqtt");
  clientMqqt.on("message", function (topic, message) {
    // message is Buffer
    setTimeout(() => {
      Relay3ChannelModel.findByIdAndUpdate(req.params.id, { room_id: null })
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
    }).catch((err) => {
      res.status(500).json(err);
    });
  });
};

const Relay3ChannelController = {
  getRelay3ChannelById,
  getAllRelay3Channel,
  deleteRelay3Channel,
  createRelay3Channel,
  updateRelay3Channel,
};

module.exports = Relay3ChannelController;
