/* const AdminServicesDelite = require("../../services/AdminServices/AdminServicesDelete");
const AdminServicesGet = require("../../services/AdminServices/AdminServicesGet");
const AdminServicesPost = require("../../services/AdminServices/AdminServicesPost");
const AdminServicesPut = require("../../services/AdminServices/AdminServicesPut");
 */
const {ClientServices} = require('../../services/Admin')

class ClientController {
    static async removeClient(req, res, next) {
        await ClientServices.serviceRemoveClient(req, next);
        return res.sendStatus(202);
      }

      static async getAllClients(req, res, next) {
        const clients = await ClientServices.serviceGetAllClients(next);
        return clients ? res.status(200).json(clients) : res.sendStatus(404);
      }

      static async getOneClient(req, res, next) {
        const oneClient = await ClientServices.serviceGetOne(req, next);
        return oneClient ? res.status(200).json(oneClient) : res.sendStatus(404);
      }
    
      static async getOneClientName(req, res, next) {
        const oneClient = await ClientServices.serviceGetOneName(req, next);
        return oneClient ? res.status(200).json(oneClient) : res.sendStatus(404);
      }

      static async getClientsDisabled(req, res, next) {
        const clientsDisabled = await ClientServices.servicesGetClientsDisabled(
          req,
          next
        );
        return clientsDisabled
          ? res.status(200).send(clientsDisabled)
          : res.sendStatus(500);
      }
    
      static async addClient(req, res, next) {
        const newClient = await ClientServices.serviceAddClient(req, next);
        return newClient ? res.status(201).json(newClient) : res.sendStatus(404);
      }

      static async disabledClient(req, res, next) {
        await ClientServices.serviceDisabledClient(req, next);
        return res.sendStatus(201);
      }

      static async rehabitedClients(req, res, next) {
        const client = await ClientServices.serviceRehabitedClinets(req, next);
        return client ? res.status(200).send(client) : res.send(client);
      }

      static async editClient(req, res, next) {
        const updatedClient = await ClientServices.serviceEditClient(req, next);
        return res.status(201).json(updatedClient);
      }
    
}

module.exports= ClientController