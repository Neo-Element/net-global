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
    isEnabledNow:{
      type:S.BOOLEAN,
      defaultValue: false
    },
    reasonToEnabled:{
      type: S.TEXT,
      defaultValue:"no fue rehabilitado aun",
      allowNull:false,

    }
  },
  {
    sequelize: db,
    modelName: "disabled",
  }
);

module.exports = Disabled;
