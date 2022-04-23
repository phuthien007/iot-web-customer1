const RoomModel = require("../models/RoomModel");

const getRoomById = (req, res) => {
  RoomModel.findById(req.params.id)
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
const getAllRoom = (req, res) => {
  try {
    RoomModel.find(req.query)
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
const updateRoom = (req, res) => {
  const id = req.params.id;
  RoomModel.findByIdAndUpdate(id, req.body, { new: true })
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
const createRoom = (req, res) => {
  const room_name = req.body.room_name;
  RoomModel.findOne({
    room_name,
  })
    .then((data) => {
      if (data) {
        res.status(400).json({ message: "Roomname is exist!" });
      } else {
        RoomModel.create({ room_name })
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
      }
    })
    .catch((err) => {
      res.json(500).json(err);
    });
};
const deleteRoom = (req, res) => {
  RoomModel.findByIdAndDelete(req.params.id)
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
};

const RoomController = {
  getRoomById,
  getAllRoom,
  deleteRoom,
  createRoom,
  updateRoom,
};

module.exports = RoomController;
