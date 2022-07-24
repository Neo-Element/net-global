const Admin = require("./Admin");
const BranchOficce = require("./BranchOficce");
const Client = require("./Clients");
const Provincies = require("./Provincies");
const Securities = require("./Securities");
const WorkDay = require("./WorkDay");
const Disabled = require("./Disabled");
const AbsenceRequest = require("./AbsenceRequest");
const Events = require("./Events");

Disabled.belongsTo(Securities);
Securities.hasOne(Disabled)
Disabled.belongsTo(Client);
Client.hasOne(Disabled)
Disabled.belongsTo(BranchOficce);
BranchOficce.hasOne(Disabled)
Disabled.belongsTo(Admin);
Admin.hasOne(Disabled)

AbsenceRequest.belongsTo(Securities);
Securities.hasMany(AbsenceRequest)

BranchOficce.belongsTo(Client);
Client.hasMany(BranchOficce)

BranchOficce.belongsTo(Provincies);
Provincies.hasMany(BranchOficce)

Events.belongsTo(WorkDay);
WorkDay.hasMany(Events)

Securities.belongsToMany(Provincies, {
  through: "provincies_security ",
});

Provincies.belongsToMany(Securities, {
  through: "provincies_security ",
});


 BranchOficce.belongsToMany(WorkDay, {
  through: "calendar_office",
});
WorkDay.belongsToMany(BranchOficce, {
  through: "calendar_office",
});

 Securities.belongsToMany(WorkDay, { through: "ownTime" });
 WorkDay.belongsToMany(Securities, { through: "ownTime" });

 
 BranchOficce.belongsToMany(Securities, {
  through: "yourSecurity",
});

Securities.belongsToMany(BranchOficce, {
  through: "yourSecurity",
});

module.exports = {
  Admin,
  BranchOficce,
  Client,
  Provincies,
  Securities,
  WorkDay,
  AbsenceRequest,
  Disabled,
  Events,
};
