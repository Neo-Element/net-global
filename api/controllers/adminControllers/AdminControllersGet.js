/* const AdminServicesGet = require("../../services/AdminServices/AdminServicesGet");
const { distance } = require("../../lib/findDistance");

class AdminControllerGet {
  static async getAllClients(req, res, next) {
    const clients = await AdminServicesGet.serviceGetAllClients(next);
    return clients ? res.status(200).json(clients) : res.sendStatus(404);
  }

  static async getOneClient(req, res, next) {
    const oneClient = await AdminServicesGet.serviceGetOne(req, next);
    return oneClient ? res.status(200).json(oneClient) : res.sendStatus(404);
  }

  static async getImageSecurityByDay(req, res, next) {
    const imagen = await AdminServicesGet.getImageSecurityByDay(req, next);
    return imagen ? res.status(200).send(imagen) : res.sendStatus(404);
  }

  static async getOneClientName(req, res, next) {
    const oneClient = await AdminServicesGet.serviceGetOneName(req, next);
    return oneClient ? res.status(200).json(oneClient) : res.sendStatus(404);
  }

  static async getAllSecurities(req, res, next) {
    const allSecurities = await AdminServicesGet.serviceGetAllSecurities(next);
    return allSecurities
      ? res.status(200).json(allSecurities)
      : res.sendStatus(404);
  }

  static async getOneSecurity(req, res, next) {
    const oneSecurity = await AdminServicesGet.serviceGetOneSecurities(
      req,
      next
    );
    return oneSecurity
      ? res.status(200).json(oneSecurity)
      : res.sendStatus(404);
  }

  static async getOneSecurityById(req, res, next) {
    const oneSecurityById = await AdminServicesGet.serviceGetOneSecurityById(
      req,
      next
    );
    return oneSecurityById
      ? res.status(200).json(oneSecurityById)
      : res.sendStatus(404);
  }

  static async getOneSecurityByCuil(req, res, next) {
    const oneSecurityByCuil =
      await AdminServicesGet.serviceGetOneSecurityByCuil(req, next);
    return oneSecurityByCuil
      ? res.status(200).json(oneSecurityByCuil)
      : res.sendStatus(404);
  }

  static async getAllOffice(req, res, next) {
    const allOfficies = await AdminServicesGet.serviceGetAllOffice(next);
    return allOfficies
      ? res.status(200).json(allOfficies)
      : res.sendStatus(404);
  }

  static async getAllOfficeByClient(req, res, next) {
    const allOfficiesByClient =
      await AdminServicesGet.serviceGetAllOfficeByClient(req, next);
    return allOfficiesByClient
      ? res.status(200).json(allOfficiesByClient)
      : res.sendStatus(404);
  }

  static async getAllOfficiesByClientName(req, res, next) {
    const allOfficiesByClientName =
      await AdminServicesGet.serviceGetAllOfficiesByClientName(req, next);
    return allOfficiesByClientName
      ? res.status(200).json(allOfficiesByClientName)
      : res.sendStatus(404);
  }

  static async getOneOffice(req, res, next) {
    const oneOffice = await AdminServicesGet.serviceGetOneOffice(req, next);
    return oneOffice ? res.status(200).json(oneOffice) : res.sendStatus(404);
  }

  static async getOneOfficeName(req, res, next) {
    const oneOffice = await AdminServicesGet.serviceGetOneOfficeName(req, next);
    return oneOffice ? res.status(200).json(oneOffice) : res.sendStatus(404);
  }

  static async getAllSecuritiesByOffice(req, res, next) {
    const securityList = await AdminServicesGet.serviceGetAllSecuritiesByOffice(
      req,
      next
    );
    return securityList
      ? res.status(200).json(securityList)
      : res.sendStatus(404);
  }

  static async getOfficeCalendar(req, res, next) {
    const officeCalendar = await AdminServicesGet.serviceGetCalenderOffice(
      req,
      next
    );
    return officeCalendar
      ? res.status(200).send(officeCalendar)
      : res.sendStatus(404);
  }

  static async getOfficeCalendarSecurity(req, res, next) {
    const securityCalendar = await AdminServicesGet.serviceGetCalenderSecurity(
      req,
      next
    );
    return securityCalendar
      ? res.status(200).json(securityCalendar)
      : res.sendStatus(404);
  }

  static async getSecuritiesByProvincie(req, res, next) {
    const securities =
      await AdminServicesGet.serviceGetAllSecuritiesByProvincie(req, next);
    return securities ? res.status(200).send(securities) : res.sendStatus(404);
  }

  static async getSecuritiesByDistance(req, res, next) {
    const securities = await AdminServicesGet.serviceGetSecuritiesByDistance(
      req,
      next
    );
    console.log(securities);
    return securities
      ? res.status(200).send(securities)
      : res.status(500).send([]);
  }

  static async getAllDisabled(req, res, next) {
    const Disabled = await AdminServicesGet.serviceGetDisabled(req, next);
    return Disabled ? res.status(200).send(Disabled) : res.sendStatus(500);
  }

  static async getSecuritiesDisabled(req, res, next) {
    const securitiesDisabled =
      await AdminServicesGet.servicesGetSecuritiesDisabled(req, next);
    return securitiesDisabled
      ? res.status(200).send(securitiesDisabled)
      : res.sendStatus(500);
  }

  static async getClientsDisabled(req, res, next) {
    const clientsDisabled = await AdminServicesGet.servicesGetClientsDisabled(
      req,
      next
    );
    return clientsDisabled
      ? res.status(200).send(clientsDisabled)
      : res.sendStatus(500);
  }

  static async getOfficiesDisabled(req, res, next) {
    const offciesDisabled = await AdminServicesGet.servicesGetOfficiesDisabled(
      req,
      next
    );
    return offciesDisabled
      ? res.status(200).send(offciesDisabled)
      : res.sendStatus(500);
  }

  static async getAdminsDisabled(req, res, next) {
    const adminsDisabled = await AdminServicesGet.servicesGetAdminsDisabled(
      req,
      next
    );
    return adminsDisabled
      ? res.status(200).send(adminsDisabled)
      : res.sendStatus(500);
  }

  static async getAllRequest(req, res, next) {
    const allRequest = await AdminServicesGet.servicesGetAllRequest(req, next);
    return allRequest ? res.status(200).send(allRequest) : res.sendStatus(500);
  }

  static async getOneRequest(req, res, next) {
    const oneRequest = await AdminServicesGet.servicesGetOneRequest(req, next);
    return oneRequest ? res.status(200).send(oneRequest) : res.sendStatus(500);
  }
  static async getAllEvents(req, res, next) {
    const events = await AdminServicesGet.serviceGetAllEvents(next);
    return events ? res.status(200).json(events) : res.sendStatus(404);
  }

  static async getBranchOfficeWithoutSecurityDay(req, res, next) {
    const office =
      await AdminServicesGet.serviceGetBranchOfficewitoutSecurityDay(req, next);
    return office ? res.status(200).json(office) : res.sendStatus(404);
  }

  static async getBranchOfficeWithoutWorkDay(req, res, next) {
    const office = await AdminServicesGet.serviceBranchOfficeWithoutWorkDay(
      req,
      next
    );
    return office ? res.status(200).json(office) : res.json([]);
  }

  static async getBranchOfficeWithoutSecurities(req, res, next) {
    const office = await AdminServicesGet.serviceBranchOfficeWithoutSecurities(
      req,
      next
    );
    return office ? res.status(200).json(office) : res.json([]);
  }

  static async getAllEventsOfBranch(req, res, next) {
    const eventsOfBranch = await AdminServicesGet.serviceGetAllEventsOfBranch(
      req,
      next
    );
    return eventsOfBranch
      ? res.status(200).json(eventsOfBranch)
      : res.sendStatus(404);
  }
}

module.exports = AdminControllerGet;
 */