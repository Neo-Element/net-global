const SecuritiesServices = require("../services/SecuriryServices");

class SecurityController {
  static async getMyWorkDay(req, res, next) {
    console.log(req.params);
    const schedule = await SecuritiesServices.serviceMyWorkDay(req, next);
    return schedule ? res.status(200).send(schedule) : res.sendStatus(404);
  }

  static async writeMyWorkDayEntry(req, res, next) {
    await SecuritiesServices.serviceToWriteMyWorkDayEntry(req, next);
    return res.sendStatus(201);
  }
  static async writeMyWorkDayClose(req, res, next) {
    await SecuritiesServices.serviceToWriteMyWorkDayClose(req, next);
    return res.sendStatus(201);
  }

  static async cancellMyWorkDay(req, res, next) {
    await SecuritiesServices.serviceCancellWorkDay(req, next);
    return res.sendstatus(200);
  }

  static async changeMyPassword(req, res, next) {
    await SecuritiesServices.serviceChangeMyPassword(req, next);
    return res.sendStatus(201);
  }

  static async saveImageSecurity(req, res, next) {
    const newImage = await SecuritiesServices.serviceSavePhoto(req, next);
    return newImage ? res.sendStatus(201) : res.sendStatus(500);
  }

  static async absenceRequest(req, res, next) {
    const newRequest = await SecuritiesServices.serviceAbsenceRequest(
      req,
      next
    );
    return newRequest ? res.sendStatus(201) : res.sendStatus(500);
  }

  static async absenceStatus(req, res, next) {
    const requests = await SecuritiesServices.serviceAbsenceRequests(req, next);
    return requests ? res.status(201).send(requests) : res.sendStatus(500);
  }

  static async hourSecurity(req, res, next) {
    const hour = await SecuritiesServices.requestHourSecurity(req, next);
    return hour ? res.status(201).send(hour) : res.sendStatus(500);
  }

  static async getNextDays(req, res, next) {
    const nextFiveDays = await SecuritiesServices.servicesGetNextWorkDays(
      req,
      next
    );
    return nextFiveDays
      ? res.status(200).json(nextFiveDays)
      : res.sendStatus(404);
  }

  static async findOfficeAndClient(req, res, next) {
    const branch = await SecuritiesServices.getOfficeAndClient(req, next);
    return branch ? res.status(200).json(branch) : res.sendStatus(404);
  }
}
module.exports = SecurityController;
