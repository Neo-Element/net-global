const { WorkDay, Securities } = require("../models");

const createWorkDay = async (req) => {
  try {
    console.log("ESTE REQ BODY ", req.body);
    const workDays = await WorkDay.create(req.body);
    console.log(workDays);
    const security = await Securities.findOne({
      where: { name: req.body.name },
    });
    security.addWorkDays(workDays);
    return security;
  } catch (err) {
    console.log(err);
  }
};

module.exports = createWorkDay;
