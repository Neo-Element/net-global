const {OfficeServices} = require('../../services/Admin')

class OfficeController {

  static async addSecurityOffice(req, res, next) {
    const security = await OfficeServices.serviceAddSecurityOffice(
      req,
      next
    );
    return security ? res.status(201).json(security) : res.sendStatus(404);
  }

    static async removeSecurityByOffice(req, res, next) {
        await OfficeServices.serviceRemoveSecurityByOffice(req, next);
        return res.sendStatus(202);
      }
      static async getAllOffice(req, res, next) {
        const allOfficies = await OfficeServices.serviceGetAllOffice(next);
        return allOfficies
          ? res.status(200).json(allOfficies)
          : res.sendStatus(404);
      }

      static async getAllOfficeByClient(req, res, next) {
        const allOfficiesByClient =
          await OfficeServices.serviceGetAllOfficeByClient(req, next);
        return allOfficiesByClient
          ? res.status(200).json(allOfficiesByClient)
          : res.sendStatus(404);
      }
    
      static async getAllOfficiesByClientName(req, res, next) {
        const allOfficiesByClientName =
          await OfficeServices.serviceGetAllOfficiesByClientName(req, next);
        return allOfficiesByClientName
          ? res.status(200).json(allOfficiesByClientName)
          : res.sendStatus(404);
      }
    
      static async getOneOffice(req, res, next) {
        const oneOffice = await OfficeServices.serviceGetOneOffice(req, next);
        return oneOffice ? res.status(200).json(oneOffice) : res.sendStatus(404);
      }

      static async getOneOfficeName(req, res, next) {
        const oneOffice = await OfficeServices.serviceGetOneOfficeName(req, next);
        return oneOffice ? res.status(200).json(oneOffice) : res.sendStatus(404);
      }

      static async getOfficiesDisabled(req, res, next) {
        const offciesDisabled = await OfficeServices.servicesGetOfficiesDisabled(
          req,
          next
        );
        return offciesDisabled
          ? res.status(200).send(offciesDisabled)
          : res.sendStatus(500);
      }

      static async getBranchOfficeWithoutSecurityDay(req, res, next) {
        const office =
          await OfficeServices.serviceGetBranchOfficewitoutSecurityDay(req, next);
        return office ? res.status(200).json(office) : res.sendStatus(404);
      }

      static async getBranchOfficeWithoutWorkDay(req, res, next) {
        const office = await OfficeServices.serviceBranchOfficeWithoutWorkDay(
          req,
          next
        );
        return office ? res.status(200).json(office) : res.json([]);
      }
    
      static async getBranchOfficeWithoutSecurities(req, res, next) {
        const office = await OfficeServices.serviceBranchOfficeWithoutSecurities(
          req,
          next
        );
        return office ? res.status(200).json(office) : res.json([]);
      }

      static async addOffice(req, res, next) {
        const newOffice = await OfficeServices.serviceAddOffice(req, next);
        return res.status(201).json(newOffice);
      }
    
      static async disabledOffice(req, res, next) {
        await OfficeServices.serviceInhabiteOffice(req, next);
        return res.sendStatus(201);
      }

      static async rehabitedOffices(req, res, next) {
        const office = await OfficeServices.serviceRehabitedOffice(req, next);
        return office ? res.status(200).send(office) : res.sendStatus(500);
      }

      static async editOffice(req, res, next) {
        const updatedOffice = await OfficeServices.serviceEditOffice(req, next);
        return res.status(201).json(updatedOffice);
      }
      
}

module.exports= OfficeController