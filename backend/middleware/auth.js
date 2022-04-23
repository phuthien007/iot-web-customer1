const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const data = jwt.verify(token, "secretkey");
      // console.log(data.payload)
      req.user = data.payload;

      next();
    } else {
      res.status(401).json({ message: "Not login" });
    }
  } catch (error) {
    res.status(403).json({ message: "Not login" });
  }
};

module.exports = {
  checkLogin,
};
