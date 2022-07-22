const S = require("sequelize");
const db = require("../db");

class Disabled extends S.Model {}
// modelo de deshabilitacion
Disabled.init(
  {
    type: {
      type: S.STRING,
    },
    inhabitedDate: {
      type: S.DATE,
    },
    reason: {
      type: S.TEXT,
    },
  },
  {
    sequelize: db,
    modelName: "disabled",
  }
);

module.exports = Disabled;
