const {AdminController}= require('../../controllers/adminController')
const router= require('express').Router()

router.get("/disabled/all", AdminController.getAllDisabled);
router.get("/disabled", AdminController.getAdminsDisabled);
router.post("/disabled/:id", AdminController.disabledAdmins);
router.put("/request/absence/:id", AdminController.responseToRequest);
router.put("/rehabited/:id", AdminController.rehabitedAdmins);

module.exports= router