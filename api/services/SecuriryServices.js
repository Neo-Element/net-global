const {
  Securities,
  WorkDay,
  BranchOficce,
  Client,
  Provincies,
  AbsenceRequest,
} = require("../models");
const { genHash } = require("../lib/passwordUtils");
const { Op } = require("sequelize");

class SecuritiesServices {
  //xxxxxxxxxxxxxxxxxxx
  static async serviceMyWorkDay(req, next) {
    console.log("service", req.params);
    try {
      const today = await WorkDay.findOne({
        where: {
          date: req.params.date,
        },
      });
      console.log("----------->>>", today);
      const schedule = await Securities.findOne({
        where: { id: req.params.id },
        include: {
          association: Securities.calendar,
          where: {
            date: today.date,
          },
        },
      });
      console.log("para que se identifique", schedule);
      const oficina = await BranchOficce.findOne({
        include: {
          association: BranchOficce.security,
          where: {
            id: schedule.id,
          },
        },
      });

      const oficinaSchedule = await BranchOficce.findOne({
        where: { id: oficina.id },
        include: {
          association: BranchOficce.calendar,
          where: {
            date: today.date,
          },
        },
      });

      console.log("OFICNA", oficina);

      const cliente = await Client.findOne({
        where: {
          id: oficina.clientId,
        },
      });

      const provincia = await Provincies.findOne({
        where: {
          id: oficina.provincyId,
        },
      });

      return oficinaSchedule && schedule && cliente && provincia
        ? {
            office: oficinaSchedule,
            calendario: schedule,
            cliente: cliente,
            provincia: provincia,
          }
        : null;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async serviceToWriteMyWorkDayEntry(req, next) {
    //xxxxxxxxxxxxxxxxxxxx
    try {
      const date = req.params.date;
      const justDate = date.split(" ")[0]; //fecha
      const allWorkDays = await Securities.findOne({
        where: { id: req.params.id },
        include: {
          association: Securities.calendar,
        },
      });
      const todaySecurity = allWorkDays.workDays.filter(
        (workaday) => workaday.date === justDate
      );
      const [rows, workDay] = await WorkDay.update(
        {
          entryHour: req.params.date,
          inLocation: req.params.geo,
          serverHourEntry: new Date(),
        },
        {
          where: { id: todaySecurity[0].dataValues.id },
          returning: true,
        }
      );
      console.log("fecha<--->>>>>>>>>>>>", req.params.date);
      return workDay;
    } catch (err) {
      next(err);
    }
  }

  static async serviceToWriteMyWorkDayClose(req, next) {
    //xxxxxxxxxxxxxxxx
    try {
      const date = req.params.date;

      const justDate = date.split(" ")[0];

      const allWorkDays = await Securities.findOne({
        where: { id: req.params.id },
        include: {
          association: Securities.calendar,
        },
      });

      const todaySecurity = allWorkDays.workDays.filter(
        (workaday) => workaday.date === justDate
      );

      const [rows, workDay] = await WorkDay.update(
        {
          closingHour: req.params.date,
          outLocation: req.params.geo,
          serverHourClosing: new Date(),
        },
        {
          where: { id: todaySecurity[0].dataValues.id },
          returning: true,
        }
      );
      return workDay;
    } catch (err) {
      next(err);
    }
  }

  static async serviceCancellWorkDay(req, next) {
    try {
      const [rows, workDay] = await WorkDay.update(
        (req.body,
        {
          where: { id: req.params.id },
        })
      );
      workDay.status = false;
      workDay.save();
      return workDay;
    } catch (err) {
      next(err);
    }
  }

  static async serviceChangeMyPassword(req, next) {
    try {
      const newPassword = await genHash(req.body.password);
      console.log(newPassword);
      await Securities.update(
        { password: newPassword.hash },
        {
          where: { id: req.params.id },
        }
      );
    } catch (err) {
      next(err);
    }
  }

  static async serviceSavePhoto(req, next) {
    try {
      const workDayUrl = WorkDay.update(
        { imageSecurity: req.body.image },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      return workDayUrl;
    } catch (err) {
      next(err);
    }
  }

  static async serviceAbsenceRequest(req, next) {
    //xxxxxxxxxxxxxxxxxxxx
    try {
      const security = await Securities.findOne({
        where: {
          id: req.params.id,
        },
      });
      const request = await AbsenceRequest.create(req.body);
      request.setSecurity(security);
      return request;
    } catch (err) {
      next(err);
    }
  }

  static async serviceAbsenceRequests(req, next) {
    
    try {
      const requests = await AbsenceRequest.findAll({
        where: {
          securityId: req.params.id,
        },
        order: [["id", "DESC"]],
      });
      return requests;
    } catch (err) {
      next(err);
    }
  }

  static async requestHourSecurity(req, next) {
    //xxxxxxxxxxxxxxxxxxxxxxx
    try {
      const security = await Securities.findOne({
        where: {
          id: req.params.id,
        },
        include: {
          association: Securities.calendar,
          where: {
            date: {
              [Op.between]: [req.params.initDate, req.params.endDate],
            },
          },
        },
      });
      let sumaHoras = [];
      security.workDays.map((workday) => {
        sumaHoras.push({
          fecha: workday.date,
          horas:
            (new Date(workday.closingHour) - new Date(workday.entryHour)) /
            1000 /
            60 /
            60,
        });
      });

      return sumaHoras;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  
  static async getOfficeAndClient(req, next) {
    //xxxxxxxxxxxxxxxxxxxxx
    try {
      const branch = await BranchOficce.findAll({
        include: [
          {
            model: WorkDay,
            where: {
              date: {
                [Op.between]: [req.params.initDate, req.params.endDate],
              },
            },
          },
          {
            model: Securities,
            where: {
              id: req.params.id,
            },
          },
        ],
      });

      let days = [];
      branch[0].workDays.map((workDay) => days.push(workDay.id));
      const securities = await Securities.findAll({
        where: { id: branch[0].dataValues.securities[0].id },
        include: {
          model: WorkDay,
          where: {
            id: days,
          },
        },
      });

      console.log(securities);
      return { oficina: branch, horario: securities };
    } catch (err) {
      next(err);
    }
  }

  static async servicesGetNextWorkDays(req, next) {
    //xxxxxxxxxxxxx
    try {
      let date = new Date();
      let day = date.getDate() + 5;
      let year = date.getFullYear();
      let month = date.getMonth();
      let nextDate = new Date(year, month, day);

      const searchNextDays = await Securities.findOne({
        where: {
          id: req.params.id,
        },
        include: {
          association: Securities.calendar,
          where: {
            date: {
              [Op.between]: [date, nextDate],
            },
          },
        },
      });
      return searchNextDays;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SecuritiesServices;
