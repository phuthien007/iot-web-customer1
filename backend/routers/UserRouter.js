const Express = require("express");
const router = Express.Router();
const UserController = require("../controllers/UserController");
const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { checkLogin } = require("../middleware/auth");

// login user
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  userModel
    .findOne({
      username,
      password,
    })
    .then((data) => {
      if (data) {
        let token = jwt.sign({ payload: data }, "secretkey");
        res.status(200).json({ token: `Bearer ${token}` });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// register user
router.post("/register", (req, res) => UserController.registerUser(req, res));

// router.use(checkLogin);

// getall user
router.get("/", UserController.getAllUser);


// get user by id
router.get("/:id", UserController.getUserById);

// update user
router.patch("/:id", UserController.updateUser);

// delete user
// getall user
router.delete("/:id", UserController.deleteUser);

module.exports = router;
