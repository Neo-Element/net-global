const {
  Client,
  Securities,
  BranchOficce,
  Provincies,
  WorkDay,
  Admin,
  Inhabited,
  Events,

} = require("../../models");
const createWorkDay = require("../../lib/createWorkDaySecurity");
const {
  validateCreateWorkDay,
  /*  validationZone, */
} = require("../../lib/validationsr");

class AdminServicesPost {
  static async serviceAddSecurityOffice(req, next) {
    try {
      const { id } = req.body;

      const office = await BranchOficce.findOne({
        where: { id: id /*  status: true */ },
      });

      const security = await Securities.findOne({
        where: {
          CUIL: req.body.CUIL,
          /* status: true */
        },
      });

      /*  const isEnable= await validationZone(security.id,office.id)
      if(isEnable){ */
      office.addSecurity(security);
      return office;
      /*   } */
    } catch (err) {
      next(err);
    }
  }

  static async serviceAddOffice(req, next) {
    try {
      const provincie = req.body.provincie;

      const { owner } = req.body;
      const provincieLocal = await Provincies.findOne({
        where: { name: provincie },
      });
      const client = await Client.findOne({
        where: {
          bussinessName: owner,
          status: true,
        },
      });
      const office = await BranchOficce.create(req.body);
      office.setClient(client);
      office.setProvincy(provincieLocal);
      return office;
    } catch (err) {
      next(err);
    }
  }

  static async serviceAddClient(req, next) {
    try {
      const client = await Client.create(req.body);
      return client;
    } catch (err) {
      next(err);
    }
  }

  static async serviceAsingSchedule(req, next) {
    try {
      const security = await Securities.findOne({
        where: {
          CUIL: req.body.CUIL,
          /* status: true */
        },
      });

      const workDay = await WorkDay.findOne({
        where: { id: req.body.id /* status: true */ },
      });
      security.addWorkDays(workDay);
      security.isBusy = true;
      security.save();
    } catch (err) {
      next(err);
    }
  }

  static async serviceAsingScheduleOffice(req, next) {
    try {
      const security = await BranchOficce.findOne({
        where: {
          id: req.body.officeId,
          status: true,
        },
      });
      const workDay = await WorkDay.findOne({
        where: { id: req.body.id /* status: true */ },
      });
      security.addWorkDays(workDay);
    } catch (err) {
      next(err);
    }
  }
  //------------------------------------------ usar este service para calendario (vision  segun oficina)-------------------------------//
  static async serviceAddSchedule(req, next) {
    console.log("req body =>  ", req.body);
    try {
      const branchOficces = await BranchOficce.findOne({
        where: { name: req.body.branchName },
      });
      const security = await Securities.findOne({
        where: {
          CUIL: req.body.CUIL,
        },
      });
      const workDay = await WorkDay.create(req.body);
      branchOficces.addWorkDays(workDay);
      security.addWorkDays(workDay);
      return branchOficces;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  //-------------------------------------------------------------------------------------------------------------------------------------//
  static async serviceAddScheduleSecurity(req, next) {
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

  static async serviceAddSecurity(req, next) {
    console.log("req body => ", req.body);
    try {
      console.log("ACÁ", req.body);
      const provincies = await Provincies.findOne({
        where: {
          name: req.body.provincie,
        },
      });

      const security = await Securities.create(req.body);

      console.log("SECURITY 1 => ", security);

      security.addProvincies(provincies);

      return security;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async serviceAddSecurityProvincie(req, next) {
    try {
      const { provincie } = req.body;
      const provincies = await Provincies.findOne({
        where: { name: provincie },
      });
      const security = await Securities.findOne({
        where: {
          name: req.body.name,
          CUIL: req.body.CUIL,
          status: true,
        },
      });
      security.addProvincies(provincies);
      return security;
    } catch (err) {
      next(err);
    }
  }


  static async serviceInhabitedAdmin(req, next){
    try{
      const admin= await Admin.findOne({
        where:{id:req.params.id}
      })
     const inhabited= await Inhabited.create(req.body);
     inhabited.setAdmin(admin)
     Admin.status=false
     Admin.save()
    }catch(err){
      next(err)
    }
  }

  static async serviceInhabiteOffice(req, next) {
    try {
      const branchOficce= await BranchOficce.findOne({
        where:{id:req.params.id}
      })
     const inhabited= await Inhabited.create(req.body);
     inhabited.setBranchOficce(branchOficce)
     branchOficce.status=false
     branchOficce.save()
    } catch (err) {
      next(err);
    }
    }

    static async serviceInhabitedSecurity(req, next) {
      try {
        const security= await Securities.findOne({
          where:{id:req.params.id}
        })
       const inhabited= await Inhabited.create(req.body);
       inhabited.setSecurity(security)
       security.status=false
       security.save()
      } catch (err) {
        next(err);
      }
    }

    static async serviceinhabitedClient(req, next) {
      try {
        const client= await Client.findOne({
          where:{id:req.params.id}
        })
       const inhabited= await Inhabited.create(req.body);
       inhabited.setClient(client)
       client.status=false
       client.save()
      } catch (err) {
        next(err);
      }
    }

    static async serviceRehabitedSecurities(req, next){
     const security= await Securities.findOne({
       where:{id: req.params.id}
     })
     const inhabited= await Inhabited.findOne({
       where:{
        securityId: security.id
       }
     })
     inhabited.removeSecurity(security)
     security.statsu= true
     security.save()
    }

    static async serviceRehabitedClinets(req, next){
      try{
      const  client= await Client.findOne({
        where:{id: req.params.id}
      })
      const inhabited= await Inhabited.findOne({
        where:{
          clientId:  client.id
        }
      })
      inhabited.removeClient(client)
      client.statsu= true
      client.save()
      return client
    } 
      catch(err){
        next(err)
      }
     }

     static async serviceRehabitedOffice(req, next){
      try{
      const  branchOffice= await BranchOficce.findOne({
        where:{id: req.params.id}
      })
      const inhabited= await Inhabited.findOne({
        where:{
          branchOficceId:  branchOffice.id
        }
      })
      inhabited.removeBranchOficce(branchOffice)
      branchOffice.status= true
      branchOffice.save()
      return branchOffice
    } 
      catch(err){
        next(err)
      }
     }

     static async serviceRehabitedAdmins(req, next){
      try{
      const  admins= await Admin.findOne({
        where:{id: req.params.id}
      })
      const inhabited= await Inhabited.findOne({
        where:{
          branchOficceId:  admins.id
        }
      })
      inhabited.removeAdmin(admins)
      admins.status= true
      admins.save()
      return admins
    } 
      catch(err){
        next(err)
      }
     }
     


  static async serviceAddEvent(req, next) {
    try {
      console.log("event req.body => ", req.body)
      const event = await Events.create(req.body);
      return event;
    } catch (err) {
      next(err);
    }
  }

}
module.exports = AdminServicesPost;
