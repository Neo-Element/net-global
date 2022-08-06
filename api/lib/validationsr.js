const { BranchOficce, Securities, Provincies } = require("../models");

function validateCreateWorkDay(inHour, exitHour, newInHour, newExitHour) {
  let listHoures = [];
  const entryHour = new Date(inHour).getHours();
  const closingHour = new Date(exitHour).getHours();
  console.log("ENTRY HOUR", entryHour, "CLOSINGHOUR", closingHour);
  for (let i = entryHour; i < closingHour; i++) {
    listHoures.push(i);
  }
  let listNewHour = [];
  const newEntryHour = new Date(newInHour).getHours();
  const newClosingHour = new Date(newExitHour).getHours();
  for (let i = newEntryHour; i < newClosingHour; i++) {
    listNewHour.push(i);
  }

  const validate = listHoures.map((hour) => {
    if (listNewHour.includes(hour)) return true;
    return false;
  });
  if (validate.includes(true)) return false;

  return true;
}

function enableOrDisable(instance) {
  instance.status = !instance.status;
  return instance.save();
}

const validationZone = async (idSecurity, idBranch) => {
  const securities = await Securities.findOne({
    where: { id: idSecurity },
    include: { model: Provincies },
  });
  const officie = await BranchOficce.findOne({
    where: { id: idBranch },
  });
  const comparation = securities.provincies.filter(
    (provincie) => provincie.id == officie.provincyId
  );
  return comparation.length > 0 ? true : false;
};

module.exports = { enableOrDisable, validateCreateWorkDay, validationZone };
