const adminRouter = require("express").Router()
const{SecurityController}= require('../../controllers/adminController')

adminRouter.get("/", SecurityController.getAllSecurities);// ready
adminRouter.get("/:search", SecurityController.SearchOneSecurity);// ready
adminRouter.get("/name/:name", SecurityController.getOneSecurity)//ready
adminRouter.get("/office/:name",SecurityController.getAllSecuritiesByOffice);//ready
adminRouter.get("/securitiesByDistance/:id",SecurityController.getSecuritiesByDistance);
adminRouter.get("/provincie/:name",SecurityController.getSecuritiesByProvincie);//ready
adminRouter.get("/images/day/:id", SecurityController.getImageSecurityByDay);//no testeable yet
adminRouter.get("/disabled",SecurityController.getSecuritiesDisabled);
adminRouter.get("/all/request", SecurityController.getAllRequest);
adminRouter.get("/oneResquest/:id", SecurityController.getOneRequest);
adminRouter.post("/add", SecurityController.addSecurity);
adminRouter.post("/add/provincie",SecurityController.addSecurityProvincie);
adminRouter.post("/disabled/:id",SecurityController.disabledSecurity);
adminRouter.put("/rehabited/:id",SecurityController.rehabitedSecurities);
adminRouter.put("/edit/:id", SecurityController.editSecurity);
adminRouter.put("/edit/status/:id",SecurityController.editSecurityStatus);
adminRouter.patch("/changePassword/:id", SecurityController.patchPassword);

module.exports = adminRouter;