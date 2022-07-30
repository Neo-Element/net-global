const adminRouter = require("express").Router()
const{SecurityController}= require('../../controllers/adminController')

adminRouter.get("/", SecurityController.getAllSecurities);
adminRouter.get("/:id", SecurityController.getOneSecurityById);
adminRouter.get("/:cuil", SecurityController.getOneSecurityByCuil);
adminRouter.get("/:name", SecurityController.getOneSecurity);
adminRouter.get("/branchoffice/:name",SecurityController.getAllSecuritiesByOffice);
adminRouter.get("/securitiesByDistance/:id",SecurityController.getSecuritiesByDistance);
adminRouter.get("/provincie/:name",SecurityController.getSecuritiesByProvincie);
adminRouter.get("/images/day/:id", SecurityController.getImageSecurityByDay);
adminRouter.get("/disabled",SecurityController.getSecuritiesDisabled);
adminRouter.get("/all/request", SecurityController.getAllRequest);
adminRouter.get("/oneResquest/:id", SecurityController.getOneRequest);
adminRouter.post("/add", SecurityController.addSecurity);
adminRouter.post("/add/provincie",SecurityController.addSecurityProvincie);
adminRouter.post("/add/office", SecurityController.addSecurityOffice);
adminRouter.post("/disabled/:id",SecurityController.disabledSecurity);
adminRouter.put("/rehabited/:id",SecurityController.rehabitedSecurities);
adminRouter.put("/edit/:id", SecurityController.editSecurity);
adminRouter.put("/edit/status/:id",SecurityController.editSecurityStatus);
adminRouter.patch("/changePassword/:id", SecurityController.patchPassword);

module.exports = adminRouter;