const { hash, genSalt, compare } = require("bcrypt");

const genHash = async (password) => {
  const salt = await genSalt(16);
  const userHash = await hash(password, salt);

  return {
    salt: salt,
    hash: userHash,
  };
};

const verifyPassword = async (password, userHash) => {
  return await compare(password, userHash);
};

module.exports = { genHash, verifyPassword };
