/* const adminRouter = require("express").Router();
const AdminControllerGet = require("../controllers/adminControllers/AdminControllersGet");
const AdminControllerPost = require("../controllers/adminControllers/AdminControllersPost");
const AdminControllerDelete = require("../controllers/adminControllers/AdminControllersDelete");
const AdminControllerPut = require("../controllers/adminControllers/AdminControllersPut");
const AdminControllerPatch = require("../controllers/adminControllers/AdminControllersPatch");

adminRouter.get("/clients", AdminControllerGet.getAllClients);
adminRouter.get("/clients/:id", AdminControllerGet.getOneClient);
adminRouter.get("/clientsname/:name", AdminControllerGet.getOneClientName);
adminRouter.get("/securities", AdminControllerGet.getAllSecurities);
adminRouter.get("/securitiesById/:id", AdminControllerGet.getOneSecurityById);
adminRouter.get("/securitiesByCuil/:cuil", AdminControllerGet.getOneSecurityByCuil);
adminRouter.get("/securities/:name", AdminControllerGet.getOneSecurity);
adminRouter.get("/office", AdminControllerGet.getAllOffice);
adminRouter.get("/office/:id", AdminControllerGet.getOneOffice);
adminRouter.get("/office/byclient/:clientId",AdminControllerGet.getAllOfficeByClient);
adminRouter.get("/office/byClientName/:clientName",AdminControllerGet.getAllOfficiesByClientName);
adminRouter.get("/officename/:name", AdminControllerGet.getOneOfficeName);
adminRouter.get("/securities/office/:name",AdminControllerGet.getAllSecuritiesByOffice);
adminRouter.get("/securitiesByDistance/:id",AdminControllerGet.getSecuritiesByDistance);
adminRouter.get("/calendar/office/:id/:date",AdminControllerGet.getOfficeCalendar);
adminRouter.get("/calendar/security/:id", AdminControllerGet.getOfficeCalendarSecurity);
adminRouter.get("/provincie/security/office/:name",AdminControllerGet.getSecuritiesByProvincie);
adminRouter.get("/images/security/day/:id", AdminControllerGet.getImageSecurityByDay);// TRAE TODAS LA IMAGENES POR WORKDAY ID
adminRouter.get("/disabled", AdminControllerGet.getAllDisabled);
adminRouter.get("/disabled/securities",AdminControllerGet.getSecuritiesDisabled);
adminRouter.get("/disabled/client", AdminControllerGet.getClientsDisabled);
adminRouter.get("/disabled/officies", AdminControllerGet.getOfficiesDisabled);
adminRouter.get("/disabled/admins", AdminControllerGet.getAdminsDisabled);
adminRouter.get("/events", AdminControllerGet.getAllEvents);
adminRouter.get("/events/:name", AdminControllerGet.getAllEventsOfBranch);// TRAE TODOS LOS EVENTOS de una BRANCH
adminRouter.get("/all/request", AdminControllerGet.getAllRequest);
adminRouter.get("/oneResquest/:id", AdminControllerGet.getOneRequest);
adminRouter.get("/without/securityDay/office", AdminControllerGet.getBranchOfficeWithoutSecurityDay )//TRAE SUCUSARLES CON HORARIOS SIN ASIGNAR EN UN RAGO DE 7 DIAS
adminRouter.get("/without/workday/office", AdminControllerGet.getBranchOfficeWithoutWorkDay)//TRAE SUCURSALES SIN DIAS ASIGNADOS
adminRouter.get("/office/noOne/security", AdminControllerGet.getBranchOfficeWithoutSecurities)//TRAE SUCURSALES SIN NINGUN VIGILADOR ASIGNADO

adminRouter.post("/add/security", AdminControllerPost.addSecurity);
adminRouter.post("/add/client", AdminControllerPost.addClient);
adminRouter.post("/add/office", AdminControllerPost.addOffice);
adminRouter.post("/add/provincie/security",AdminControllerPost.addSecurityProvincie);
adminRouter.post("/add/office/security", AdminControllerPost.addSecurityOffice);
adminRouter.post("/add/Calendar/office", AdminControllerPost.addSchedule);
adminRouter.post("/add/Calendar/security",AdminControllerPost.addScheduleSecurity);// AGREGA CALENDAR A VIGILANTE
adminRouter.post("/assign/Calendar/security",AdminControllerPost.asingScheduleToSecurity);
adminRouter.post("/add/event", AdminControllerPost.addEvent);
adminRouter.post("/disabled/security/:id",AdminControllerPost.disabledSecurity);
adminRouter.post("/disabled/client/:id", AdminControllerPost.disabledClient);
adminRouter.post("/disabled/office/:id", AdminControllerPost.disabledOffice);
adminRouter.post("/disabled/admin/:id", AdminControllerPost.disabledAdmins);

adminRouter.delete("/remove/office/security/:name/:id",AdminControllerDelete.removeSecurityByOffice);
adminRouter.delete("/remove/calendar/office/:id",AdminControllerDelete.removeScheduleOffice);
adminRouter.delete("/deleteEvent/:id", AdminControllerDelete.removeEvent);

adminRouter.put("/rehabited/security/:id",AdminControllerPost.rehabitedSecurities);
adminRouter.put("/rehabited/office/:id", AdminControllerPost.rehabitedOffices);
adminRouter.put("/rehabited/client/:id", AdminControllerPost.rehabitedClients);
adminRouter.put("/rehabited/admin/:id", AdminControllerPost.rehabitedAdmins);
adminRouter.put("/edit/office/:id", AdminControllerPut.editOffice);
adminRouter.put("/edit/security/:id", AdminControllerPut.editSecurity);
adminRouter.put("/edit/client/:id", AdminControllerPut.editClient);
adminRouter.put("/edit/calendar/:id", AdminControllerPut.editCalendar);
adminRouter.put("/edit/securityStatus/:id",AdminControllerPut.editSecurityStatus);
adminRouter.put("/request/absence/:id", AdminControllerPut.responseToRequest);
adminRouter.put("edit/event/:id", AdminControllerPut.editEvent);

adminRouter.patch("/changePassword/:id", AdminControllerPatch.patchPassword);

module.exports = adminRouter; */