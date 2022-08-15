const { Op } = require("sequelize");
const { BranchOficce, Securities, Provincies, WorkDay } = require("../models");

const validateCreateWorkDay = async (
  inHour,
  exitHour,
  newInHour,
  newExitHour
) => {
  let listHoures = [];
  const entryHour = Number(inHour.split(":")[0]);
  const closingHour = Number(exitHour.split(":")[0]);
  let contador1= entryHour
  while (contador1 !== closingHour) {
    if (contador1 === 23) listHoures.push(contador1);
    if(contador1 === entryHour) listHoures.push(contador1)
    let hour = transcriptorHour(contador1, closingHour);
    listHoures.push(hour);
    contador1 = hour;
  }
  console.log("hours first", listHoures);
  let listNewHour = [];
  let newEntryHour = Number(newInHour.split(":")[0]);
  const newClosingHour = Number(newExitHour.split(":")[0]);

  let contador = newEntryHour;
  while (contador !== newClosingHour) {
    if (contador === 23) listNewHour.push(contador);
    if(contador === newEntryHour) listNewHour.push(contador)
    let hour = transcriptorHour(contador, newClosingHour);
    listNewHour.push(hour);
    contador = hour;
  }

  console.log("hours last", listNewHour);
  const validate = listHoures.map((hour) => {
    if (listNewHour.includes(hour)) return true;
    return false;
  });
  if (validate.includes(true)) return true;

  return false;
};

function transcriptorHour(entry, closing) {
  if (entry < closing) return entry + 1;
  if (entry === 24) return 0;
  if (entry !== 24) return (entry = entry + 1);
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
