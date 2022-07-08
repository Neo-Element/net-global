const { verify } = require("jsonwebtoken");
const { readFileSync } = require("fs");
const { join } = require("path");

const pathToPubKey = join(__dirname, "../config", "id_rsa_pub.pem");
const PUB_KEY = readFileSync(pathToPubKey, "utf8");

const failAuthMessage = {
  success: false,
  msg: "You are not authorized to visit this route",
};

function userAuthMiddleware(req, res, next) {
  const jwtParts = req.headers.authorization.split(" ");

  if (jwtParts[0] === "Bearer" && jwtParts[1].match(/\S+\.\S+\.\S+/) !== null) {
    try {
      const verification = verify(
        jwtParts[1],
        PUB_KEY,
        {
          algorithms: ["RS256"],
        },
        (error, payload) => {
          if (!payload.admin) return true;
        }
      );
      if (verification) return next();
      return res.status(401).json(failAuthMessage);
    } catch (err) {
      return res.status(401).json(failAuthMessage);
    }
  } else {
    return res.status(401).json(failAuthMessage);
  }
}

function adminAuthMiddleware(req, res, next) {
  const jwtParts = req.headers.authorization.split(" ");

  if (jwtParts[0] === "Bearer" && jwtParts[1].match(/\S+\.\S+\.\S+/) !== null) {
    try {
      const verification = verify(
        jwtParts[1],
        PUB_KEY,
        {
          algorithms: ["RS256"],
        },
        (error, payload) => {
          if (payload.admin) return true;
          return false;
        }
      );
      if (verification) return next();
      return res.status(401).json(failAuthMessage);
    } catch (err) {
      return res.status(401).json(failAuthMessage);
    }
  } else {
    return res.status(401).json(failAuthMessage);
  }
}

module.exports = { userAuthMiddleware, adminAuthMiddleware };
