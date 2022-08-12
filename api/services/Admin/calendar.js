const {
    Client,
    Securities,
    BranchOficce,
    Provincies,
    WorkDay,
    Admin,
    Events,
    Disabled,
  } = require("../../models");


  const {validateCreateWorkDay,   } = require("../../lib/validationsr");
class CalendarServices {
    static async serviceRemoveSchedule(req, next) {
        //xxxxxxx
        try {
          const workDay = await WorkDay.findOne({
            where: { date: req.params.date },
            include: { model: Events, through: { where: { id: req.body.id } } },
          });
    
          const event = await Events.findOne({
            where: {
              id: req.body.id,
            },
          });
    
          const security = await Securities.findOne({
            where: {
              CUIL: req.body.CUIL,
            },
          });
          
          workDay.removeSecurities(security);
          workDay.removeEvent(event);
          workDay.removeSecurity(security);
        } catch (err) {
          next(err);
        }
      }
      static async serviceRemoveEvent(req, next) {
        //xxxxxxxxxxxxxxx
        try {
          // const event = await Events.findOne({
          //   where: {
          //     id: req.params.id,
          //   },
          // });
          // const workDay = await WorkDay.findOne({
          //   where: { date: event.date },
          // });
          // const security = await Securities.findOne({
          //   where: {
          //     id: req.body.securityId,
          //   },
          // });
          //security.removeWorkDays(workDay);
          //workDay.removeEvent(event);
          await Events.destroy({
            where: {
              id: req.params.id,
            },
          });
          const workDay = await WorkDay.findOne({
            where: { date: event.date },
          });
          const security = await Securities.findOne({
            where: {
              CUIL: req.body.CUIL,
            },
          });
          console.log(security);
          security.removeWorkDays(workDay);
          workDay.removeEvent(event);
          await Events.destroy({
            where: {
              id: event.id,
            },
          });
        } catch (err) {
          next(err);
        }
      }

      static async serviceGetCalenderOffice(req, next) {
        //xxxxxxxxxxx
        try {
          const calendar = await BranchOficce.findOne({
            where: { id: req.params.id },
            include: {
              association: BranchOficce.calendar,
              where: {
                date: req.params.date,
              },
            },
          });
          const securities = await BranchOficce.findAll({
            where: { id: req.params.id },
            include: {
              association: BranchOficce.security,
            },
          });
        
          const arrayId = securities[0].securities.map(
            (security) => security.dataValues.id
          );
    
          const onlyWithCalendar = await Securities.findAll({
            where: {
              id: arrayId,
            },
            include: {
              association: Securities.calendar,
              where: {
                date: req.params.date,
              },
            },
          });
    
          return {
            calendar: calendar.workDays,
            securities: securities[0].securities,
            onlyCalendar: onlyWithCalendar,
          };
        } catch (err) {
          console.log(err);
          next(err);
        }
      }
    
      static async serviceGetCalenderSecurity(req, next) {
        ///xxxxxxxx
        try {
          const scheduleSecurity = await Securities.findOne({
            where: { id: req.params.id },
            include: {
              association: Securities.calendar,
            },
          });
          return scheduleSecurity;
        } catch (err) {
          next(err);
        }
      }

      static async serviceGetAllEvents(next) {
        try {
          const events = await Events.findAll();
          return events;
        } catch (err) {
          next(err);
        }
      }
    
      static async serviceGetAllEventsOfBranch(req, next) {
        try {
          const eventsBranch = await Events.findAll({
            where: {
              branchName: req.params.name,
            },
          });
          return eventsBranch;
        } catch (err) {
          next(err);
        }
      }

      static async serviceAsingSchedule(req, next) {
        //xxxxxxxxxxxxxxxxxxxx
        try {
          const security = await Securities.findOne({
            where: {
              CUIL: req.body.CUIL,
              status: true,
            },
          });
    
          const workDay = await WorkDay.findOne({
            where: { id: req.body.id },
          });
          security.addWorkDays(workDay);
          security.isBusy = true;
          security.save();
        } catch (err) {
          next(err);
        }
      }

        
  static async serviceAddSchedule(req, next) {
    try {
      const {wishEntryHour,wishClosingHour,CUIL,branchName,date} = req.body;
      const branchOficces = await BranchOficce.findOne({
        where: { name: branchName },
        include:{
          model:Securities,
          where:{CUIL: CUIL}, include:{model:WorkDay, where:{date:date}}
        }
      });
      const [security]=branchOficces.securities
      
      if(!security.workDays[1]){
    const securityBussy = await validateCreateWorkDay(security.workDays[0].wishEntryHour, security.workDays[0].wishClosingHour,  wishEntryHour, wishClosingHour)
      if(securityBussy) return "this security is bussy in this schedule"
   const workDay = await WorkDay.create({
        date: date,
        wishClosingHour: wishClosingHour,
        wishEntryHour: wishEntryHour,
      });
      
      const event = await Events.create({
        date: date,
        start: workDay.wishEntryHour,
        end: workDay.wishClosingHour,
        branchName: branchOficces.name,
        securityName: security.name,
      });
      console.log(security);
      event.setWorkDay(workDay);
      branchOficces.addWorkDays(workDay);
      security.addWorkDays(workDay); 
      return branchOficces
    }else{
      return "this security has two shedules in this date, please choose another day"
    }

    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  //-------------------------------------------------------------------------------------------------------------------------------------//
  static async serviceAddScheduleSecurity(req, next) {
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxx
    try {
      const haveDays = await Securities.findOne({
        where: { name: req.body.name },
        include: {
          association: Securities.calendar,
          where: {
            wishEntryHour: req.body.wishEntryHour,
          },
        },
      });
      console.log("HAVE DAYS", haveDays);
      if (!haveDays) {
        const workDays = await WorkDay.create(req.body);
        const security = await Securities.findOne({
          where: { name: req.body.name },
        });
        console.log("SECURITY", security);
        security.isBusy = true;
        security.save();
        security.addWorkDays(workDays);
        return security;
      }
      const { dataValues } = haveDays.dataValues.workDays[0];
      const definition = validateCreateWorkDay(
        dataValues.wishEntryHour,
        dataValues.closingHour,
        req.body.wishEntryHour,
        req.body.wishClosingHour
      );

      return definition ? createWorkDay(req) : definition;
    } catch (err) {
      next(err);
    }
  }

  static async serviceAddEvent(req, next) {
    //xxxxxxxxxxxxxxxx
    try {
      const event = await Events.create(req.body);
      console.log("ESTO ES EVENT", event.dataValues);
      const workDay = await WorkDay.findOne({
        where: {
          date: event.dataValues.date,
        },
      });
      console.log("WORKDAY", workDay);
      event.setWorkDay(workDay);
      return event;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
    

  static async serviceEditCalendarOffice(req, next) {
    try {
      const [rows, newSchedule] = await WorkDay.update(req.body, {
        where: { id: req.body.id },
        returning: true,
        plain: true,
      });
    } catch (err) {
      next(err);
    }
  }

  static async serviceEditCalendar(req, next) {
    try {
      const [rows, newSchedule] = await WorkDay.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
    } catch (err) {
      next(err);
    }
  }

  static async serviceEditEvent(req, next) {
    try {
      const [row, event] = await Events.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      });
      return event;
    } catch (err) {
      next(err);
    }
  }
}


module.exports= CalendarServices