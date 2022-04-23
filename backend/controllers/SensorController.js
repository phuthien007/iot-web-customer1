const SensorModel = require("../models/SensorModel");

const getSensorById = (req, res) => {
  SensorModel.findById(req.params.id)
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
const getAllSensor = (req, res) => {
  try {
    SensorModel.find(req.query)
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
const updateSensor = (req, res) => {
  const id = req.params.id;
  SensorModel.findByIdAndUpdate(id, req.body, { new: true })
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
const createSensor = (req, res) => {
  try {
    SensorModel.create(req.body)
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
const deleteSensor = (req, res) => {
  SensorModel.findByIdAndDelete(req.params.id)
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

const SensorController = {
  getSensorById,
  getAllSensor,
  deleteSensor,
  createSensor,
  updateSensor,
};

module.exports = SensorController;
