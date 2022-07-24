/* const {
  Client,
  Securities,
  BranchOficce,
  Provincies,
  WorkDay,
  Admin,
  Events,
  Disabled,
} = require("../../models");
const createWorkDay = require("../../lib/createWorkDaySecurity");
const {
  validateCreateWorkDay,
  /*  validationZone, */
/* } = require("../../lib/validationsr");

class AdminServicesPost {
  //xxxxxxxx
  static async serviceAddSecurityOffice(req, next) {
    try {
      const { id } = req.body;

      const office = await BranchOficce.findOne({
        where: { id: id   status: true  },
      });

      const security = await Securities.findOne({
        where: {
          CUIL: req.body.CUIL,
           status: true 
        },
      });

      /*  const isEnable= await validationZone(security.id,office.id)
      if(isEnable){ 
      office.addSecurity(security);
      return office;
      /*   } 
    } catch (err) {
      next(err);
    }
  }

  static async serviceAddOffice(req, next) {
    //xxxxxxxxxxxxxxxxxxxxxxxxx
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
      console.log("ESTE ES EL ERROR", err)
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

  //------------------------------------------ usar este service para calendario (vision  segun oficina)-------------------------------//
  static async serviceAddSchedule(req, next) {
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    try {
      /* ESTO ES REQ BODY {
        [0]   CUIL: '223344777642',
        [0]   wishEntryHour: '20:25',
        [0]   wishClosingHour: '20:25',
        [0]   completeName: 'mario reartes',
        [0]   branchName: 'adidas1',
        [0]   date: '2022-04-13',
        [0]   start: '2022-04-13T20:25:00',
        [0]   end: '2022-04-13T20:25:00',
        [0]   securityId: 1
        [0] } */ /* date: event.date,
      start: event.start,
      end: event.end,
      branchName: event.branchName,
      securityName: event.completeName, 
      const {
        wishEntryHour,
        wishClosingHour,
        completeName,
        branchName,
        date,
        start,
        end,
      } = req.body;
      console.log("ESTO ES REQ BODY", req.body);
      const branchOficces = await BranchOficce.findOne({
        where: { name: req.body.branchName },
      });
      const security = await Securities.findOne({
        where: {
          CUIL: req.body.CUIL,
        },
      });
      const workDay = await WorkDay.create({
        date: date,
        wishClosingHour: wishClosingHour,
        wishEntryHour: wishEntryHour,
      });
      const event = await Events.create({
        date: date,
        start: start,
        end: end,
        branchName: branchName,
        securityName: completeName,
      });
      event.setWorkDay(workDay);
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

  static async serviceAddSecurity(req, next) {
    //xxxxxxxxxxxxxxxxxxxx
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
    //xxxxxxxxxxxxxxxxxxx
    try {
      const { provincie } = req.body;
      const provincies = await Provincies.findOne({
        where: { name: provincie },
      });
      const security = await Securities.findOne({
        where: {
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

  static async serviceDisabledAdmin(req, next) {
    //xxxxxxxxxxxxxxxxx
    try {
      const admin = await Admin.findOne({
        where: { id: req.params.id },
      });
      const disabled = await Disabled.create(req.body);
      disabled.setAdmin(admin);
      Admin.status = false;
      Admin.save();
    } catch (err) {
      next(err);
    }
  }

  static async serviceInhabiteOffice(req, next) {
    //xxxxxxxxxxxxx
    try {
      const branchOficce = await BranchOficce.findOne({
        where: { id: req.params.id },
      });
      const disabled = await Disabled.create(req.body);
      disabled.setBranchOficce(branchOficce);
      branchOficce.status = false;
      branchOficce.save();
    } catch (err) {
      next(err);
    }
  }

  static async serviceDisabledSecurity(req, next) {
    //xxxxxxxxxxxxxxxxxxxxxxxx
    try {
      const security = await Securities.findOne({
        where: { id: req.params.id },
      });
      const disabled = await Disabled.create(req.body);
      disabled.setSecurity(security);
      security.status = false;
      security.save();
    } catch (err) {
      next(err);
    }
  }

  static async serviceDisabledClient(req, next) {
    ///xxxxxxxxxxxxxxxxxxxxxxxx
    try {
      console.log("req.params => ", req.params);
      console.log("req.body => ", req.body);
      const client = await Client.findOne({
        where: { id: req.params.id },
      });
      const branchOficce = await BranchOficce.findAll({
        where: { clientId: client.id },
      });
      const disabled = await Disabled.create(req.body);
      branchOficce.map(async (branchOffice) => {
        const disabled = await Disabled.create(req.body);
        branchOffice.dataValues.status = false && branchOffice.save();
        return disabled.setBranchOficce(branchOffice);
      });
      disabled.setClient(client);
      client.status = false;
      client.save();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async serviceRehabitedSecurities(req, next) {
    //xxxxxxxxxxxxxxxxxxxxxxxxxxx
    try {
      const security = await Securities.findOne({
        where: { id: req.params.id },
      });
      const [row, disabled] = await Disabled.update(
        { securityId: null },
        {
          where: {
            securityId: security.id,
          },
        }
      );
      security.status = true;
      security.save();
      return security;
    } catch (err) {
      next(err);
    }
  }

  static async serviceRehabitedClinets(req, next) {
    //xxxxxxxxxxxxxxxx
    try {
      const client = await Client.findOne({
        where: { id: req.params.id },
      });
      const [row, disabled] = await Disabled.update(
        { clientId: null },
        {
          where: {
            clientId: client.id,
          },
        }
      );
      client.status = true;
      client.save();
      return client;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async serviceRehabitedOffice(req, next) {
    //xxxxxxxxxxxxxxxxxx
    try {
      const branchOffice = await BranchOficce.findOne({
        where: { id: req.params.id },
      });
      const [row, disabled] = await Disabled.update(
        { branchOficceId: null },
        {
          where: {
            branchOficceId: branchOffice.id,
          },
        }
      );

      branchOffice.status = true;
      branchOffice.save();
      return branchOffice;
    } catch (err) {
      next(err);
    }
  }

  static async serviceRehabitedAdmins(req, next) {
    //xxxxxxxxxxxxxxxxxxxx
    try {
      const admin = await Admin.findOne({
        where: { id: req.params.id },
      });

      const [row, disabled] = await Disabled.update(
        { adminId: null },
        {
          where: {
            adminId: admin.id,
          },
        }
      );
      console.log("Disabled", disabled);
      admin.status = true;
      admin.save();
      return admin;
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
}
module.exports = AdminServicesPost;  */
 