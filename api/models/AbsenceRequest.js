const S = require("sequelize");
const db = require("../db");

class AbsenceRequest extends S.Model {}
// modelo de pedido de ausencia
AbsenceRequest.init(
  {
    initDate: {
      type: S.DATEONLY,
    },
    endDate: {
      type: S.DATEONLY,
    },
    reason: {
      type: S.TEXT,
    },
    status: {
      type: S.STRING,
      defaultValue: "Pendiente",
    },
  },
  {
    sequelize: db,
    modelName: "absenceRequest",
  }
);

module.exports = AbsenceRequest;
