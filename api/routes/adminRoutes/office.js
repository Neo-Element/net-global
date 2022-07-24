const adminRouter = require("express").Router();
const{OfficeController}= require('../../controllers/adminController')

adminRouter.get("/", OfficeController.getAllOffice);
adminRouter.get("/:id", OfficeController.getOneOffice);
adminRouter.get("/byclient/:clientId",OfficeController.getAllOfficeByClient);
adminRouter.get("/byClientName/:clientName",OfficeController.getAllOfficiesByClientName);
adminRouter.get("/:name", OfficeController.getOneOfficeName);
adminRouter.get("/disabled", OfficeController.getOfficiesDisabled);
adminRouter.get("/noOne/security", OfficeController.getBranchOfficeWithoutSecurities)
adminRouter.post("/add", OfficeController.addOffice);
adminRouter.get("/without/workday", OfficeController.getBranchOfficeWithoutWorkDay)//
adminRouter.delete("/remove/security/:name/:id",OfficeController.removeSecurityByOffice);
adminRouter.put("/rehabited/:id", OfficeController.rehabitedOffices);
adminRouter.put("/edit/:id", OfficeController.editOffice);


module.exports = adminRouter;