const db = require("./index");
const { Provincies, Admin, Securities, Client } = require("../models");
const provinces = require("../utils/provinces");
const superAdmin = require("../utils/superAAdmin");
const securitiesList = require("../utils/lists/securitiesList");
const clientsList = require("../utils/lists/clientsList");

const setupSeed = async () => {
  console.log("SEED STARTING");
  const admins = await Admin.bulkCreate(superAdmin);
  const securities = await Securities.bulkCreate(securitiesList);
  const clients = await Client.bulkCreate(clientsList);
  const provincies = await Provincies.bulkCreate(provinces);
  return Promise.all([admins, clients, securities, provincies]);
};

db.sync({ force: false })
  .then(setupSeed)
  .then(() => {
    console.log("Seed succesfully");
    process.exit(0);
  })
  .catch((err) => {
    console.log("Somethin went wrong on the seed process", err.message);
    process.exit(1);
  });
