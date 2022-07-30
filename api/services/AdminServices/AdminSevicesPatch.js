/* const { Admin } = require("../../models");

class AdminServicesPatch {
  static async patchPassword(req, next) {
    try {
      await Admin.update(req.body, {
        where: { id: req.params.id },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminServicesPatch; */
