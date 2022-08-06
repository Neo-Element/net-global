const adminRouter = require("express").Router();
const{OfficeController}= require('../../controllers/adminController')

adminRouter.get("/", OfficeController.getAllOffice);// ready
adminRouter.get("/disabled", OfficeController.getOfficiesDisabled)//ready
adminRouter.get("/:id", OfficeController.getOneOffice);//ready
adminRouter.get("/name/:name", OfficeController.getOneOfficeName);//ready
adminRouter.get("/client/:clientId",OfficeController.getAllOfficeByClient);//ready
adminRouter.get("/clientname/:clientName",OfficeController.getAllOfficiesByClientName)//ready
adminRouter.get("/without/security/day", OfficeController.getBranchOfficeWithoutSecurityDay)//ready
adminRouter.get("/noOne/security", OfficeController.getBranchOfficeWithoutSecurities)// ready
adminRouter.get("/without/workday", OfficeController.getBranchOfficeWithoutWorkDay)//ready
adminRouter.post("/add/office", OfficeController.addSecurityOffice);//ready
adminRouter.post("/add", OfficeController.addOffice);//ready
adminRouter.post("/disabled/:id", OfficeController.disabledOffice)//ready
adminRouter.delete("/remove/security/:name/:id",OfficeController.removeSecurityByOffice);//ready
adminRouter.put("/rehabited/:id", OfficeController.rehabitedOffices);//ready
adminRouter.put("/edit/:id", OfficeController.editOffice);//ready


module.exports = adminRouter;