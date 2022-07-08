const AdminServicesPatch = require("../../services/AdminServices/AdminSevicesPatch");

class AdminControllerPatch {
  static async patchPassword(req, res, next) {
    const patchPassword = await AdminServicesPatch.patchPassword(req, next);
    return patchPassword
      ? res.status(204).json(patchPassword)
      : res.sendStatus(404);
  }
}
module.exports = AdminControllerPatch;
