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
Securities.hasMany(Disabled)
Disabled.belongsTo(Client);
Client.hasMany(Disabled)
Disabled.belongsTo(BranchOficce);
BranchOficce.hasMany(Disabled)
Disabled.belongsTo(Admin);
Admin.hasMany(Disabled)

AbsenceRequest.belongsTo(Securities);
Securities.hasMany(AbsenceRequest)

BranchOficce.belongsTo(Client);
Client.hasMany(BranchOficce)

BranchOficce.belongsTo(Provincies);
Provincies.hasMany(BranchOficce)

Events.belongsTo(WorkDay);
WorkDay.hasMany(Events)


Provincies.belongsToMany(Securities, {
  through: "provincies_security ",
});

Securities.belongsToMany(Provincies, {
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
