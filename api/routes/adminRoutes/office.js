const adminRouter = require("express").Router();
const{OfficeController}= require('../../controllers/adminController')

adminRouter.get("/", OfficeController.getAllOffice);// ready
adminRouter.get("/:id", OfficeController.getOneOffice);//ready
adminRouter.get("/client/:clientId",OfficeController.getAllOfficeByClient);//ready
adminRouter.get("/clientname/:clientName",OfficeController.getAllOfficiesByClientName)//ready
adminRouter.get("/without/office", OfficeController.getBranchOfficeWithoutSecurityDay )
adminRouter.get("/:name", OfficeController.getOneOfficeName);
adminRouter.get("/disabled", OfficeController.getOfficiesDisabled);
adminRouter.get("/noOne/security", OfficeController.getBranchOfficeWithoutSecurities)
adminRouter.post("/add", OfficeController.addOffice);
adminRouter.get("/without/workday", OfficeController.getBranchOfficeWithoutWorkDay)//
adminRouter.delete("/remove/security/:name/:id",OfficeController.removeSecurityByOffice);
adminRouter.put("/rehabited/:id", OfficeController.rehabitedOffices);
adminRouter.put("/edit/:id", OfficeController.editOffice);


module.exports = adminRouter;