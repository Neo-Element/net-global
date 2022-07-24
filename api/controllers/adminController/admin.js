const {AdminServices} = require('../../services/Admin')

class AdminController {
    static async getAllDisabled(req, res, next) {
        const Disabled = await AdminServices.serviceGetDisabled(req, next);
        return Disabled ? res.status(200).send(Disabled) : res.sendStatus(500);
      }

      static async getAdminsDisabled(req, res, next) {
        const adminsDisabled = await AdminServices.servicesGetAdminsDisabled(
          req,
          next
        );
        return adminsDisabled
          ? res.status(200).send(adminsDisabled)
          : res.sendStatus(500);
      }

      static async disabledAdmins(req, res, next) {
        await AdminServices.serviceDisabledAdmin(req, next);
        return res.sendStatus(201);
      }

      static async rehabitedAdmins(req, res, next) {
        const admins = await AdminServices.serviceRehabitedAdmins(req, next);
        return admins ? res.status(200).send(admins) : res.send([]);
      }

      static async responseToRequest(req, res, next) {
        const request = await AdminServices.serviceResponseRequest(req, next);
        return request ? res.status(201).send(request) : res.sendStatus(500);
      }
}

module.exports= AdminController