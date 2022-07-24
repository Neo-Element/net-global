const adminRouter = require("express").Router();
const{ClientController}= require('../../controllers/adminController')

adminRouter.get("/", ClientController.getAllClients);
adminRouter.get("/:id", ClientController.getOneClient);
adminRouter.get("/:name", ClientController.getOneClientName)
adminRouter.get("/disabled", ClientController.getClientsDisabled);
adminRouter.post("/add", ClientController.addClient);
adminRouter.post("/disabled/:id", ClientController.disabledClient);
adminRouter.put("/rehabited/:id", ClientController.rehabitedClients);
adminRouter.put("/edit/:id", ClientController.editClient);


module.exports = adminRouter;