const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //COMES FROM CLIENT/FRONT END
  const { authorization } = req.headers;
  const secret = process.env.JWT_SECRET || "abcd";

  if (authorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Please provide correct credentials" });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ error: "Please provide credentials" });
  }
};
