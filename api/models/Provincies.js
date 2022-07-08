const S = require("sequelize");
const db = require("../db");

class Provincies extends S.Model {}

Provincies.init(
  {
    name: {
      type: S.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "provincies",
  }
);
module.exports = Provincies;
