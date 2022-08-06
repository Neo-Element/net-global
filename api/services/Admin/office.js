const { Op } = require("sequelize");
const {countHours, freeSecurity} = require("../../lib/countHours");
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
const {validateCreateWorkDay,  validationZone,  } = require("../../lib/validationsr");
class OfficeServices {
  static async serviceGetAllOffice(next) {
    try {
      const allOffice = await BranchOficce.findAll();
      return allOffice;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetAllOfficeByClient(req, next) {
    try {
      const allOfficeByClient = await BranchOficce.findAll({
        where: {
          clientId: req.params.clientId,
          status: true,
        },
      });
      return allOfficeByClient;
    } catch (err) {
      console.log("error => ", err);
      next(err);
    }
  }

  static async serviceGetAllOfficiesByClientName(req, next) {
    try {
      console.log(req.params);
      const clients = await Client.findOne({
        where: {
          bussinessName: req.params.clientName,
        }, include:{model: BranchOficce}
      });
    
      return clients.branchOficces;
    } catch (err) {
      console.log("error => ", err);
      next(err);
    }
  }

  static async serviceGetOneOffice(req, next) {
    try {
      const office = await BranchOficce.findOne({
        where: { id: req.params.id },
        include: { model: Client },
      });
      return office;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async serviceGetOneOfficeName(req, next) {
    try {
      const oneOffice = await BranchOficce.findOne({
        where: { name:{
          [Op.like]:req.params.name + '%'
        }  },
      });
      return oneOffice;
    } catch (err) {
      next(err);
    }
  }

  static async servicesGetOfficiesDisabled(req, next) {
    try {
      const officiesDisabled = await Disabled.findAll({
        where: { [Op.and]:[{type: "branchOffice"}, {isEnabledNow:false}] },
      });
      return officiesDisabled;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetBranchOfficewitoutSecurityDay(req, next) {
    try {
      let date = new Date();
      let nextDate = new Date(date.getFullYear(),date.getMonth(), date.getDate() + 7);
      const workDayBranch = await BranchOficce.findAll({
        include: {
          model: WorkDay,
          where: {
            date: {
              [Op.between]: [date, nextDate],
            },
          },
        },
      });

     const hours= await countHours(workDayBranch)    
      return hours;
    } catch (err) {
      next(err);
    }
  }

  static async serviceBranchOfficeWithoutWorkDay(req, next) {
   
    try {
      const branches = await BranchOficce.findAll({
        include: {
          model: WorkDay,
        },
      });

     const branchWithOutWorkDay = branches.filter(
        (branch) => branch.workDays.length === 0
      ); 
      return branchWithOutWorkDay;
    } catch (err) {
      next(err);
    }
  }

  static async serviceBranchOfficeWithoutSecurities(req, next) {
    try {
      const branches = await BranchOficce.findAll({
        include: {
          model: Securities,
        },
      });
      const withOutSecurities = await freeSecurity(branches)
      return withOutSecurities;
    } catch (err) {
      next(err);
    }
  }

  
  static async serviceAddSecurityOffice(req, next) {
    try {
      const { id } = req.body;
      const office = await BranchOficce.findOne({
        where: { [Op.and]:[{id: id} , {status: true} ] }
      });

      const security = await Securities.findOne({
        where: {
          [Op.and]:[{CUIL: req.body.CUIL}, {status: true}]
        },
      });

        const isEnable= await validationZone(security.id,office.id)
      if(isEnable){ 
      office.addSecurity(security);
      return office;
        }
    } catch (err) {
      next(err);
    }
  }

  static async serviceAddOffice(req, next) {
    try {
      const { owner , provincie } = req.body;
      const provincieLocal = await Provincies.findOne({
        where: { name: provincie },
      });
      const client = await Client.findOne({
        where: {
          [Op.and]:[
          {bussinessName: owner},
          {status: true}]
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

  static async serviceInhabiteOffice(req, next) {
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

  static async serviceRehabitedOffice(req, next) {

    try {
      const branchOffice = await BranchOficce.findOne({
        where: { id: req.params.id },
      });
      const [row, disabled] = await Disabled.update(
        { isEnabledNow:true, reasonToEnabled: req.body.reason },
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

   static async serviceRemoveSecurityByOffice(req, next) {
    try {
      const office = await BranchOficce.findOne({
        where: {
          name: req.params.name,
        },include:{model:Securities, where:{id:req.params.id}}
      });

      office.removeSecurity(office.securities);
      return office;
    } catch (err) {
      next(err);
    }
  }

  static async serviceEditOffice(req, next) {
    try {
      const [rows, update] = await BranchOficce.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      });
      return update;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OfficeServices;
