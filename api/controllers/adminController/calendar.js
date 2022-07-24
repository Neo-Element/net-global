const {CalendarServices} = require('../../services/Admin')

class CalendarController {
    static async removeScheduleOffice(req, res, next) {
        await CalendarServices.serviceRemoveSchedule(req, next);
        return res.sendStatus(202);
      }

      static async removeEvent(req, res, next) {
        await CalendarServices.serviceRemoveEvent(req, next);
        return res.sendStatus(202);
      }

      static async getOfficeCalendar(req, res, next) {
        const officeCalendar = await CalendarServices.serviceGetCalenderOffice(
          req,
          next
        );
        return officeCalendar
          ? res.status(200).send(officeCalendar)
          : res.sendStatus(404);
      }
    
      static async getOfficeCalendarSecurity(req, res, next) {
        const securityCalendar = await CalendarServices.serviceGetCalenderSecurity(
          req,
          next
        );
        return securityCalendar
          ? res.status(200).json(securityCalendar)
          : res.sendStatus(404);
      }
    
      static async getAllEvents(req, res, next) {
        const events = await CalendarServices.serviceGetAllEvents(next);
        return events ? res.status(200).json(events) : res.sendStatus(404);
      }

      static async getAllEventsOfBranch(req, res, next) {
        const eventsOfBranch = await CalendarServices.serviceGetAllEventsOfBranch(
          req,
          next
        );
        return eventsOfBranch
          ? res.status(200).json(eventsOfBranch)
          : res.sendStatus(404);
      }
      //------------------------- este es el controller a usar para calendario (vision sucursal) --------------------------------------//
  static async addSchedule(req, res, next) {
    const schedule = await CalendarServices.serviceAddSchedule(req, next);
    return schedule ? res.status(201).json(schedule) : res.sendStatus(500);
  }
  //--------------------------------------------------------- q--------------------------------------------------------------------///
  static async addScheduleSecurity(req, res, next) {
    const workDay = await CalendarServices.serviceAddScheduleSecurity(
      req,
      next
    );
    return workDay ? res.status(201).send(workDay) : res.sendStatus(401);
  }

  static async asingScheduleToSecurity(req, res, next) {
    await CalendarServices.serviceAsingSchedule(req, next);
    return res.sendStatus(201);
  }

  static async addEvent(req, res, next) {
    const newEvent = await CalendarServices.serviceAddEvent(req, next);
    return newEvent ? res.status(201).json(newEvent) : res.sendStatus(404);
  }

  static async editCalendar(req, res, next) {
    const updateCalendar = await CalendarServices.serviceEditCalendar(
      req,
      next
    );
    return res.status(201).json(updateCalendar);
  }

  static async editEvent(req, res, next) {
    const editedEvent = await CalendarServices.serviceEditEvent(req, next);
    return editedEvent
      ? req.status(201).send(editedEvent)
      : res.sendStatus(500);
  }
}

module.exports= CalendarController