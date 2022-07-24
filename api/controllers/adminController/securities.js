const {SecuritiesServices} = require('../../services/Admin')

class SecurityController {
    static async removeSecurity(req, res, next) {
        await SecuritiesServices.serviceRemoveSecurity(req, next);
        return res.status(202).json([]);
      }

      static async getImageSecurityByDay(req, res, next) {
        const imagen = await SecuritiesServices.getImageSecurityByDay(req, next);
        return imagen ? res.status(200).send(imagen) : res.sendStatus(404);
      }

      static async getAllSecurities(req, res, next) {
        const allSecurities = await SecuritiesServices.serviceGetAllSecurities(next);
        return allSecurities
          ? res.status(200).json(allSecurities)
          : res.sendStatus(404);
      }

      static async getOneSecurity(req, res, next) {
        const oneSecurity = await SecuritiesServices.serviceGetOneSecurities(
          req,
          next
        );
        return oneSecurity
          ? res.status(200).json(oneSecurity)
          : res.sendStatus(404);
      }

      static async getOneSecurityById(req, res, next) {
        const oneSecurityById = await SecuritiesServices.serviceGetOneSecurityById(
          req,
          next
        );
        return oneSecurityById
          ? res.status(200).json(oneSecurityById)
          : res.sendStatus(404);
      }
    
      static async getOneSecurityByCuil(req, res, next) {
        const oneSecurityByCuil =
          await SecuritiesServices.serviceGetOneSecurityByCuil(req, next);
        return oneSecurityByCuil
          ? res.status(200).json(oneSecurityByCuil)
          : res.sendStatus(404);
      }

      static async getAllSecuritiesByOffice(req, res, next) {
        const securityList = await SecuritiesServices.serviceGetAllSecuritiesByOffice(
          req,
          next
        );
        return securityList
          ? res.status(200).json(securityList)
          : res.sendStatus(404);
      }

      static async getSecuritiesByProvincie(req, res, next) {
        const securities =
          await SecuritiesServices.serviceGetAllSecuritiesByProvincie(req, next);
        return securities ? res.status(200).send(securities) : res.sendStatus(404);
      }

      static async getSecuritiesByDistance(req, res, next) {
        const securities = await SecuritiesServices.serviceGetSecuritiesByDistance(
          req,
          next
        );
        console.log(securities);
        return securities
          ? res.status(200).send(securities)
          : res.status(500).send([]);
      }

      static async getSecuritiesDisabled(req, res, next) {
        const securitiesDisabled =
          await SecuritiesServices.servicesGetSecuritiesDisabled(req, next);
        return securitiesDisabled
          ? res.status(200).send(securitiesDisabled)
          : res.sendStatus(500);
      }

      static async getAllRequest(req, res, next) {
        const allRequest = await SecuritiesServices.servicesGetAllRequest(req, next);
        return allRequest ? res.status(200).send(allRequest) : res.sendStatus(500);
      }

      static async getOneRequest(req, res, next) {
        const oneRequest = await SecuritiesServices.servicesGetOneRequest(req, next);
        return oneRequest ? res.status(200).send(oneRequest) : res.sendStatus(500);
      }

      static async patchPassword(req, res, next) {
        const patchPassword = await SecuritiesServices.patchPassword(req, next);
        return patchPassword
          ? res.status(204).json(patchPassword)
          : res.sendStatus(404);
      }

      static async addSecurity(req, res, next) {
        const office = await SecuritiesServices.serviceAddSecurity(req, next);
        return office ? res.status(200).json(office) : res.sendStatus(500);
      }
    
      static async addSecurityOffice(req, res, next) {
        const security = await SecuritiesServices.serviceAddSecurityOffice(
          req,
          next
        );
        return security ? res.status(201).json(security) : res.sendStatus(404);
      }
    
      static async addSecurityProvincie(req, res, next) {
        await SecuritiesServices.serviceAddSecurityProvincie(req, next);
        return res.sendStatus(201);
      }
    
      static async disabledSecurity(req, res, next) {
        await SecuritiesServices.serviceDisabledSecurity(req, next);
        return res.sendStatus(201);
      }

      static async rehabitedSecurities(req, res, next) {
        const securities = await SecuritiesServices.serviceRehabitedSecurities(
          req,
          next
        );
        return securities ? res.status(201).send(securities) : res.send(securities);
      }

      static async editSecurity(req, res, next) {
        const updatedSecurity = await SecuritiesServices.serviceEditSecurity(
          req,
          next
        );
        return res.status(201).json([updatedSecurity]);
      }

      static async editSecurityStatus(req, res, next) {
        const updatedSecurity = await SecuritiesServices.serviceEditSecurityStatus(
          req,
          next
        );
        return res.status(201).send(updatedSecurity);
      }
}

module.exports= SecurityController