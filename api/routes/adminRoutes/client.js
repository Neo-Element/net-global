const adminRouter = require("express").Router();
const{ClientController}= require('../../controllers/adminController')

adminRouter.get("/", ClientController.getAllClients);//ready
adminRouter.get("/disabled", ClientController.getClientsDisabled);//ready
adminRouter.get("/:id", ClientController.getOneClient); //ready
adminRouter.get("/name/:name", ClientController.getOneClientName) //ready
adminRouter.post("/add", ClientController.addClient);//ready
adminRouter.post("/disabled/:id", ClientController.disabledClient);//ready
adminRouter.put("/rehabited/:id", ClientController.rehabitedClients);//ready
adminRouter.put("/edit/:id", ClientController.editClient);


module.exports = adminRouter;