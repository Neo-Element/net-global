const {AdminController}= require('../../controllers/adminController')
const router= require('express').Router()

router.get("/disabled/all", AdminController.getAllDisabled);//ready
router.get("/disabled", AdminController.getAdminsDisabled);//ready
router.post("/disabled/:id", AdminController.disabledAdmins);//ready
router.put("/request/absence/:id", AdminController.responseToRequest);// await security services ready for testing
router.put("/rehabited/:id", AdminController.rehabitedAdmins);// ready

module.exports= router