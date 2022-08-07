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
    AbsenceRequest
  } = require("../../models");
  

class AdminServices {
    static async serviceGetDisabled(req, next) {
        try {
          const allInhabites = await Disabled.findAll({where:{isEnabledNow:false}});
          return allInhabites;
        } catch (err) {
          next(err);
        }
      }

      static async servicesGetAdminsDisabled(req, next) {
        try {
          const adminsDisabled = await Disabled.findAll({
            where: {[Op.and]:[{ type: "admins"},{isEnabledNow:false}] },
          });
          return adminsDisabled;
        } catch (err) {
          next(err);
        }
      }

      static async servicesGetAllRequest(req, next) {
        try {
          const allRequest = await AbsenceRequest.findAll();
          return allRequest;
        } catch (err) {
          next(err);
        }
      }
    
       // static async servicesGetOneRequest(req, res, next) {
  //   try {
  //     const oneRequest = await AbsenceRequest.findOne({
  //       where: { id: req.params.id },
  //     });

  //     return oneRequest;
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  static async servicesGetOneRequest(req, res, next) {
    //xxxxxxx
    try {
      const oneRequest = await AbsenceRequest.findOne({
        where: { id: req.params.id },
      });
      const security = await Securities.findOne({
        where: { id: oneRequest.securityId },
      });
      return { oneRequest, security };
    } catch (err) {
      next(err);
    }
  }

  static async serviceDisabledAdmin(req, next) {
    try {
      const admin = await Admin.findByPk(req.params.id);
      const disabled = await Disabled.create(req.body);
      disabled.setAdmin(admin);
      admin.status = false;
      admin.save();
    } catch (err) {
      next(err);
    }
  }

  static async serviceRehabitedAdmins(req, next) {
    //xxxxxxxxxxxxxxxxxxxx
    try {
      const admin = await Admin.findOne({
        where: { id: req.params.id },
      });

      const [row, disabled] = await Disabled.update(
        { adminId: null },
        {
          where: {
            adminId: admin.id,
          },
        }
      );
      console.log("Disabled", disabled);
      admin.status = true;
      admin.save();
      return admin;
    } catch (err) {
      next(err);
    }
  }

  static async serviceResponseRequest(req, next) {
    //xxxxxxxxxxxxxxxxxxxxxxxx
    try {
      const request = await AbsenceRequest.findOne({
        where: { id: req.params.id },
      });
      console.log(request.dataValues.securityId);
      const security = await Securities.findOne({
        where: { id: request.dataValues.securityId },
        include: {
          association: Securities.calendar,
          where: {
            date: {
              [Op.between]: [
                request.dataValues.initDate,
                request.dataValues.endDate,
              ],
            },
          },
        },
      });
      console.log("SECURITY", security.workDays);
      let days = [];
      security.workDays.map((workDay) => days.push(workDay.id));
      const workDays = await WorkDay.findAll({
        where: { id: days },
      });
      const [row, response] = await AbsenceRequest.update(
        { status: req.body.status },
        {
          where: { id: request.id },
          returning: true,
          plain: true,
        }
      );

      if (response.status === "Accepted") {
        security.removeWorkDays(workDays);
      }
      console.log(response);
      return response;
    } catch (err) {
      next(err);
    }
  }
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

module.exports= AdminServices