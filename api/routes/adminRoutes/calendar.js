const adminRouter = require("express").Router();
const{CalendarController}= require('../../controllers/adminController')

adminRouter.get("/office/:id/:date",CalendarController.getOfficeCalendar);
adminRouter.get("/security/:id", CalendarController.getOfficeCalendarSecurity);
adminRouter.get("/events", CalendarController.getAllEvents);
adminRouter.get("/events/:name", CalendarController.getAllEventsOfBranch);
adminRouter.post("/add/office", CalendarController.addSchedule);//ready
adminRouter.post("/add/security",CalendarController.addScheduleSecurity);// AGREGA CALENDAR A VIGILANTE
adminRouter.post("/assign/security",CalendarController.asingScheduleToSecurity);
adminRouter.post("/add/event", CalendarController.addEvent);
adminRouter.delete("/remove/office/:id",CalendarController.removeScheduleOffice);
adminRouter.delete("/deleteEvent/:id", CalendarController.removeEvent);
adminRouter.put("/edit/:id", CalendarController.editCalendar);
adminRouter.put("edit/event/:id", CalendarController.editEvent);


module.exports = adminRouter;