const jwt = require("jsonwebtoken");
module.exports = function(req, res, next) {
  if (req.type === 'OPTIONS'){
    next();
  }
  const jwttoken = req.header("Authorization");
  if (!jwttoken) return res.status(401).json({ message: "Auth Error" });
  try {
    const tokenArray = jwttoken.split(" ");
    const token = tokenArray[1];
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};