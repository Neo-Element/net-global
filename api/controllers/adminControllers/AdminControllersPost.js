/* const AdminServicesPost = require("../../services/AdminServices/AdminServicesPost");

class AdminControllerPost {
  static async addSecurity(req, res, next) {
    const office = await AdminServicesPost.serviceAddSecurity(req, next);
    return office ? res.status(200).json(office) : res.sendStatus(500);
  }

  static async addOffice(req, res, next) {
    const newOffice = await AdminServicesPost.serviceAddOffice(req, next);
    return res.status(201).json(newOffice);
  }

  static async addClient(req, res, next) {
    const newClient = await AdminServicesPost.serviceAddClient(req, next);
    return newClient ? res.status(201).json(newClient) : res.sendStatus(404);
  }
  //------------------------- este es el controller a usar para calendario (vision sucursal) --------------------------------------//
  static async addSchedule(req, res, next) {
    const schedule = await AdminServicesPost.serviceAddSchedule(req, next);
    return schedule ? res.status(201).json(schedule) : res.sendStatus(500);
  }
  //--------------------------------------------------------- q--------------------------------------------------------------------///
  static async addScheduleSecurity(req, res, next) {
    const workDay = await AdminServicesPost.serviceAddScheduleSecurity(
      req,
      next
    );
    return workDay ? res.status(201).send(workDay) : res.sendStatus(401);
  }

  static async asingScheduleToSecurity(req, res, next) {
    await AdminServicesPost.serviceAsingSchedule(req, next);
    return res.sendStatus(201);
  }

  static async addSecurityOffice(req, res, next) {
    const security = await AdminServicesPost.serviceAddSecurityOffice(
      req,
      next
    );
    return security ? res.status(201).json(security) : res.sendStatus(404);
  }

  static async addSecurityProvincie(req, res, next) {
    await AdminServicesPost.serviceAddSecurityProvincie(req, next);
    return res.sendStatus(201);
  }

  static async disabledSecurity(req, res, next) {
    await AdminServicesPost.serviceDisabledSecurity(req, next);
    return res.sendStatus(201);
  }

  static async disabledClient(req, res, next) {
    await AdminServicesPost.serviceDisabledClient(req, next);
    return res.sendStatus(201);
  }

  static async disabledOffice(req, res, next) {
    await AdminServicesPost.serviceInhabiteOffice(req, next);
    return res.sendStatus(201);
  }

  static async disabledAdmins(req, res, next) {
    await AdminServicesPost.serviceDisabledAdmin(req, next);
    return res.sendStatus(201);
  }

  static async rehabitedSecurities(req, res, next) {
    const securities = await AdminServicesPost.serviceRehabitedSecurities(
      req,
      next
    );
    return securities ? res.status(201).send(securities) : res.send(securities);
  }

  static async rehabitedClients(req, res, next) {
    const client = await AdminServicesPost.serviceRehabitedClinets(req, next);
    return client ? res.status(200).send(client) : res.send(client);
  }

  static async rehabitedOffices(req, res, next) {
    const office = await AdminServicesPost.serviceRehabitedOffice(req, next);
    return office ? res.status(200).send(office) : res.sendStatus(500);
  }

  static async rehabitedAdmins(req, res, next) {
    const admins = await AdminServicesPost.serviceRehabitedAdmins(req, next);
    return admins ? res.status(200).send(admins) : res.send([]);
  }

  static async addEvent(req, res, next) {
    const newEvent = await AdminServicesPost.serviceAddEvent(req, next);
    return newEvent ? res.status(201).json(newEvent) : res.sendStatus(404);
  }
}
module.exports = AdminControllerPost;
 */