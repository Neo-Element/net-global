const S = require("sequelize");
const db = require("../db");

class Events extends S.Model {}

Events.init(
  {
    date: {
      type: S.STRING,
    },
    start: {
      type: S.STRING,
    },
    end: {
      type: S.STRING,
    },
    securityName: {
      type: S.STRING,
    },
    branchName: {
      type: S.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "events",
  }
);

Events.sync({ alter: false });

module.exports = Events;
