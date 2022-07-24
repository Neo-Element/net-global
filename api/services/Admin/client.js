const {
    Client,
    Securities,
    BranchOficce,
    Provincies,
    WorkDay,
    Admin,
    Events,
    Disabled,
  } = require("../../models");
class ClientServices {
    static async serviceGetAllClients(next) {
        try {
          const clients = await Client.findAll();
          return clients;
        } catch (err) {
          next(err);
        }
      }

      static async serviceGetOne(req, next) {
        try {
          const oneClient = await Client.findOne({
            where: { id: req.params.id },
          });
          return oneClient;
        } catch (err) {
          next(err);
        }
      }

      static async serviceGetOneName(req, next) {
        try {
          const oneClient = await Client.findOne({
            where: { bussinessName: req.params.name },
          });
          return oneClient;
        } catch (err) {
          console.log(err);
          next(err);
        }
      }

      static async servicesGetClientsDisabled(req, next) {
        try {
          const clientsDisabled = await Disabled.findAll({
            where: { type: "clients" },
          });
          return clientsDisabled;
        } catch (err) {
          next(err);
        }
      }

      static async serviceAddClient(req, next) {
        try {
          const client = await Client.create(req.body);
          return client;
        } catch (err) {
          console.log("ESTE ES EL ERROR", err)
          next(err);
        }
      }

      static async serviceDisabledClient(req, next) {
        ///xxxxxxxxxxxxxxxxxxxxxxxx
        try {
          console.log("req.params => ", req.params);
          console.log("req.body => ", req.body);
          const client = await Client.findOne({
            where: { id: req.params.id },
          });
          const branchOficce = await BranchOficce.findAll({
            where: { clientId: client.id },
          });
          const disabled = await Disabled.create(req.body);
          branchOficce.map(async (branchOffice) => {
            const disabled = await Disabled.create(req.body);
            branchOffice.dataValues.status = false && branchOffice.save();
            return disabled.setBranchOficce(branchOffice);
          });
          disabled.setClient(client);
          client.status = false;
          client.save();
        } catch (err) {
          console.log(err);
          next(err);
        }
      }

      static async serviceRehabitedClinets(req, next) {
        //xxxxxxxxxxxxxxxx
        try {
          const client = await Client.findOne({
            where: { id: req.params.id },
          });
          const [row, disabled] = await Disabled.update(
            { clientId: null },
            {
              where: {
                clientId: client.id,
              },
            }
          );
          client.status = true;
          client.save();
          return client;
        } catch (err) {
          console.log(err);
          next(err);
        }
      }

      static async serviceEditClient(req, next) {
        try {
          const [rows, update] = await Client.update(req.body, {
            where: {
              id: req.params.id,
            },
            returning: true,
            plain: true,
          });
          return update;
        } catch (err) {
          next(err);
        }
      }
    
}

module.exports= ClientServices