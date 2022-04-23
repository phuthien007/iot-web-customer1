const UserModel = require("../models/UserModel");

const getUserById = (req, res) => {
  UserModel.findById(req.params.id)
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
const getAllUser = (req, res) => {
  try {
    UserModel.find(req.query)
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
const updateUser = (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(id, req.body, { new: true })
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
const registerUser = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  UserModel.findOne({
    username,
  })
    .then((data) => {
      if (data) {
        res.status(400).json({ message: "username is exist!" });
      } else {
        UserModel.create({ username, password })
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
const deleteUser = (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
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

const UserController = {
  getUserById,
  getAllUser,
  deleteUser,
  registerUser,
  updateUser,
};

module.exports = UserController;
