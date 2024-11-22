var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const fetchcanteen = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res
      .status(500)
      .send({ error: "Please authenticate using a valid token." });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_secret);
    req.admin = data;
    next();
  } catch (error) {
    res.status(500).send({ error: "Please authenticate using a valid token." });
  }
};

module.exports = fetchcanteen;
