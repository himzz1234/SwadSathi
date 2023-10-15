var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userAuth = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token." });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_secret);
    req.user = data;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token." });
  }
};

module.exports = userAuth;
