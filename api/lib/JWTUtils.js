const { sign, verify } = require("jsonwebtoken");
const { readFileSync } = require("fs");
const { join } = require("path");

const pathToKey = join(__dirname, "../config", "id_rsa_priv.pem");
const PRIV_KEY = readFileSync(pathToKey, "utf8");

function creatingJWT(user, isAdmin) {
  const email = user.email;

  const expiresIn = "15d";

  const payload = {
    sub: email,
    start: Date.now(),
    admin: isAdmin ? true : false,
  };

  const signedToken = sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

function recovery(userID) {
  const token = sign({ userID }, PRIV_KEY, { expiresIn: "10m" });

  return token;
}

function validator(token) {
  return verify(token, PRIV_KEY);
}

module.exports = { creatingJWT, recovery, validator };
