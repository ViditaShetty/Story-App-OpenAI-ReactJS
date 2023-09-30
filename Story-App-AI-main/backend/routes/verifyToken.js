//middleware function for user.js 
//verfies if user is permitted crud operations?

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;//token in local storage 
  if (authHeader) {
    const token = authHeader;///chnaged this*******
    jwt.verify(token, "ndfssf6473", (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,// response pswd and db pswd matches?
  verifyTokenAndAuthorization,//for crud operations?
  verifyTokenAndAdmin,//is she admin to make changes to products collection?
};