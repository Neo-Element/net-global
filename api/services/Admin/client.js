const { Op } = require("sequelize");
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
        where: 
            { id: req.params.id },
         
        
      });
      return oneClient;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetOneName(req, next) {
    try {
      const oneClient = await Client.findOne({
        where: {bussinessName: req.params.name },
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
        where: {  [Op.and]:[{type: "clients"}, {isEnabledNow:false}]},
         include:{
          model:Client
        } 
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
      next(err);
    }
  }

  static async serviceDisabledClient(req, next) {
    try {
      const client = await Client.findOne({
        where: { id: req.params.id },
        include:{
          model: BranchOficce
        }

      });
      const disabled = await Disabled.create(req.body);
      client.branchOficces.map((branchOffice) => {
        branchOffice.status = false 
        return branchOffice.save();
      }); 
      
      client.addDisabled(disabled);
      disabled.isEnabledNow=false
      client.status = false;
      client.save();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async serviceRehabitedClinets(req, next) {
    try {
      const client = await Client.findOne({
        where: { id: req.params.id },
        include:[{model:Disabled}, {model:BranchOficce}]
      });
      await Disabled.update(
        { isEnabledNow:true, reasonToEnabled: req.body.reason },
        {
          where: {
            clientId: client.id,
          },
        }
      );
      client.branchOficces.map((branchOffice) => {
        branchOffice.status = true 
        return branchOffice.save();
      }); 
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

module.exports = ClientServices;
