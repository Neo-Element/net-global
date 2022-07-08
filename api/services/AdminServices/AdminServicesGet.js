const {
  Client,
  Securities,
  BranchOficce,
  Provincies,
  WorkDay,
  Events,
  AbsenceRequest,
  Disabled,
} = require("../../models");
/* const { Op } = require("@sequelize/core"); */
const { Op } = require("sequelize");
const { distance } = require("../../lib/findDistance.js");

class AdminServicesGet {
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

  static async serviceGetOneSecurities(req, next) {
    const [name, lastName] = req.params.name.split(" ");
    try {
      const oneSecurity = await Securities.findAll({
        where: {
          [Op.or]: [{ name: name }, { name: name, lastName: lastName }],
        },
      });
      return oneSecurity;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetAllSecurities(next) {
    try {
      const allSecurities = await Securities.findAll();
      return allSecurities;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetOneSecurityById(req, next) {
    try {
      const oneSecurity = await Securities.findAll({
        where: {
          id: req.params.id,
        },
      });
      return oneSecurity;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetOneSecurityByCuil(req, next) {
    try {
      const oneSecurityCuil = await Securities.findAll({
        where: {
          CUIL: req.params.cuil,
        },
      });
      return oneSecurityCuil;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetAllOffice(next) {
    try {
      const allOffice = await BranchOficce.findAll();
      return allOffice;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetAllOfficeByClient(req, next) {
    try {
      const allOfficeByClient = await BranchOficce.findAll({
        where: {
          clientId: req.params.clientId,
          status: true,
        },
      });
      return allOfficeByClient;
    } catch (err) {
      console.log("error => ", err);
      next(err);
    }
  }

  static async serviceGetAllOfficiesByClientName(req, next) {
    try {
      console.log(req.params);
      const clients = await Client.findOne({
        where: {
          bussinessName: req.params.clientName,
        },
      });
      const offices = await BranchOficce.findAll({
        where: { clientId: clients.id },
      });
      return offices;
    } catch (err) {
      console.log("error => ", err);
      next(err);
    }
  }

  static async serviceGetOneOffice(req, next) {
    try {
      const oneOffice = await BranchOficce.findByPk(req.params.id);
      const officeName = await Client.findByPk(oneOffice.clientId);
      oneOffice.dataValues.clientName = officeName.bussinessName;
      return oneOffice;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async serviceGetOneOfficeName(req, next) {
    try {
      const oneOffice = await BranchOficce.findOne({
        where: { name: req.params.name },
      });
      return oneOffice;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetAllSecuritiesByOffice(req, next) {
    try {
      const securityList = await BranchOficce.findAll({
        where: { name: req.params.name },
        include: {
          association: BranchOficce.security,
          where: {
            status: true,
          },
        },
      });

      return securityList;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetCalenderOffice(req, next) {
    try {
      const calendar = await BranchOficce.findOne({
        where: { id: req.params.id },
        include: {
          association: BranchOficce.calendar,
          where: {
            date: req.params.date,
          },
        },
      });
      const securities = await BranchOficce.findAll({
        where: { id: req.params.id },
        include: {
          association: BranchOficce.security,
        },
      });
      console.log(securities);
      const arrayId = securities[0].securities.map(
        (security) => security.dataValues.id
      );

      const onlyWithCalendar = await Securities.findAll({
        where: {
          id: arrayId,
        },
        include: {
          association: Securities.calendar,
          where: {
            date: req.params.date,
          },
        },
      });

      return {
        calendar: calendar.workDays,
        securities: securities[0].securities,
        onlyCalendar: onlyWithCalendar,
      };
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async serviceGetAllSecuritiesByProvincie(req, next) {
    try {
      const provincieBranch = await BranchOficce.findAll({
        where: {
          name: req.params.name,
        },
      });

      const provincieId = provincieBranch[0].provincyId;
      const securities = await Securities.findAll({
        include: {
          association: Securities.provincie,
          where: {
            id: provincieId,
          },
        },
      });
      return securities;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async serviceGetCalenderSecurity(req, next) {
    try {
      const scheduleSecurity = await Securities.findOne({
        where: { id: req.params.id },
        include: {
          association: Securities.calendar,
        },
      });
      return scheduleSecurity;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetSecuritiesByDistance(req, next) {
    const { y, x } = req.body;
    const { id } = req.params;

    let orderedSecurities = [];
    let min;

    try {
      let securities = await Securities.findAll({
        include: {
          association: Securities.provincie,
          where: {
            id: id,
          },
        },
      });

      securities = securities.map((securitie) => {
        const dist = distance(y, x, securitie.y, securitie.x);
        securitie.dist = dist;
        console.log("aca", y, x);
        return securitie;
      });

      while (securities[0]) {
        min = securities[0];
        securities.forEach((security) => {
          if (min.dist > security.dist) min = security;
        });
        securities = securities.filter((security) => security.id != min.id);
        orderedSecurities.push(min);
      }

      return orderedSecurities.slice(0, 5);
    } catch (error) {
      next(error);
    }
  }

  static async getImageSecurity(req, next) {
    try {
      const image = WorkDay.findAll({
        where: {
          id: req.params.id,
        },
        include: {
          attributes: ["imageSecurity"],
        },
      });
      return image;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetDisabled(req, next) {
    try {
      const allInhabites = await Disabled.findAll();
      return allInhabites;
    } catch (err) {
      next(err);
    }
  }

  static async servicesGetSecuritiesDisabled(req, next) {
    try {
      const securitiesDisabled = await Disabled.findAll({
        where: { type: "securities" },
      });
      return securitiesDisabled;
    } catch (err) {
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

  static async servicesGetOfficiesDisabled(req, next) {
    try {
      const officiesDisabled = await Disabled.findAll({
        where: { type: "branchOffice" },
      });
      return officiesDisabled;
    } catch (err) {
      next(err);
    }
  }

  static async servicesGetAdminsDisabled(req, next) {
    try {
      const adminsDisabled = await Disabled.findAll({
        where: { type: "admins" },
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

  static async serviceGetAllEvents(next) {
    try {
      const events = await Events.findAll();
      return events;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetBranchOfficewitoutSecurityDay(req, next) {
    try {
      let date = new Date();
      let day = date.getDate() + 7;
      let year = date.getFullYear();
      let month = date.getMonth();
      let nextDate = new Date(year, month, day);
      const workDayBranch = await BranchOficce.findAll({
        include: {
          association: BranchOficce.calendar,
          where: {
            date: {
              [Op.between]: [date, nextDate],
            },
          },
        },
      });

      const branchHours = workDayBranch.map((branch) => {
        let branchinfo = { branch: branch.id, hours: 0 };
        branch.workDays.map((workDay) => {
          branchinfo.hours +=
            (new Date(`${workDay.date} ${workDay.wishClosingHour}`) -
              new Date(`${workDay.date} ${workDay.wishEntryHour}`)) /
            1000 /
            60 /
            60;
        });
        return branchinfo;
      });

      const branchWithoutSecurity = branchHours.filter(
        (branch) => branch.hours < 168
      );

      return branchWithoutSecurity;
    } catch (err) {
      next(err);
    }
  }

  static async serviceBranchOfficeWithoutWorkDay(req, next) {
    try {
      const branches = await BranchOficce.findAll({
        include: {
          association: BranchOficce.calendar,
        },
      });

      const branchWithOutWorkDay = branches.filter(
        (branch) => branch.workDays.length === 0
      );
      return branchWithOutWorkDay;
    } catch (err) {
      next(err);
    }
  }

  static async serviceBranchOfficeWithoutSecurities(req, next) {
    try {
      const branches = await BranchOficce.findAll({
        include: {
          association: BranchOficce.security,
        },
      });

      const branchWithOutWorkDay = branches.filter(
        (branch) => branch.securities.length === 0
      );
      return branchWithOutWorkDay;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetAllEventsOfBranch(req, next) {
    try {
      const eventsBranch = await Events.findAll({
        where: {
          branchName: req.params.name,
        },
      });
      return eventsBranch;
    } catch (err) {
      next(err);
    }
  }
}
module.exports = AdminServicesGet;
