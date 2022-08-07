const adminRouter = require("express").Router()
const{SecurityController}= require('../../controllers/adminController')

adminRouter.get("/", SecurityController.getAllSecurities);// ready
adminRouter.get("/disabled",SecurityController.getSecuritiesDisabled);//ready
adminRouter.get("/id/:id", SecurityController.SearchOneSecurityId);// ready
adminRouter.get("/cuil/:cuil", SecurityController.SearchOneSecurityCuil)//ready
adminRouter.get("/name/:name", SecurityController.getOneSecurity)//ready
adminRouter.get("/office/:name",SecurityController.getAllSecuritiesByOffice);//ready
adminRouter.get("/securitiesByDistance/:id",SecurityController.getSecuritiesByDistance);//ready
adminRouter.get("/provincie/:name",SecurityController.getSecuritiesByProvincie);//ready
adminRouter.get("/images/day/:id", SecurityController.getImageSecurityByDay);//no testeable yet
adminRouter.get("/all/request", SecurityController.getAllRequest);// teateable with routes of PWA
adminRouter.get("/oneResquest/:id", SecurityController.getOneRequest);//teasteable with routes of PWA
adminRouter.post("/add", SecurityController.addSecurity);//ready
adminRouter.post("/add/provincie",SecurityController.addSecurityProvincie);//ready
adminRouter.post("/disabled/:id",SecurityController.disabledSecurity);//ready
adminRouter.put("/rehabited/:id",SecurityController.rehabitedSecurities);// ready
adminRouter.put("/edit/:id", SecurityController.editSecurity);//ready


module.exports = adminRouter;