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
        //xxxxxxx
        try {
          console.log(req.params);
          const clients = await Client.findOne({
            where: {
              bussinessName: req.params.clientName,
            },
          });
          const offices = await BranchOficce.findAll({
            where: { clientId: clients.id },
          });
          return offices;
        } catch (err) {
          console.log("error => ", err);
          next(err);
        }
      }

      static async serviceGetOneOffice(req, next) {
        //xxxxxxxxx
        try {
          const oneOffice = await BranchOficce.findByPk(req.params.id);
          const officeName = await Client.findByPk(oneOffice.clientId);
          oneOffice.dataValues.clientName = officeName.bussinessName;
          return oneOffice;
        } catch (err) {
          console.log(err);
          next(err);
        }
      }

      static async serviceGetOneOfficeName(req, next) {
        try {
          const oneOffice = await BranchOficce.findOne({
            where: { name: req.params.name },
          });
          return oneOffice;
        } catch (err) {
          next(err);
        }
      }

      static async servicesGetOfficiesDisabled(req, next) {
        try {
          const officiesDisabled = await Disabled.findAll({
            where: { type: "branchOffice" },
          });
          return officiesDisabled;
        } catch (err) {
          next(err);
        }
      }

     
  static async serviceGetBranchOfficewitoutSecurityDay(req, next) {
    //xxxxxx
    try {
      let date = new Date();
      let day = date.getDate() + 7;
      let year = date.getFullYear();
      let month = date.getMonth();
      let nextDate = new Date(year, month, day);
      const workDayBranch = await BranchOficce.findAll({
        include: {
          association: BranchOficce.calendar,
          where: {
            date: {
              [Op.between]: [date, nextDate],
            },
          },
        },
      });

      const branchHours = workDayBranch.map((branch) => {
        let branchinfo = { branch: branch.id, hours: 0 };
        branch.workDays.map((workDay) => {
          branchinfo.hours +=
            (new Date(`${workDay.date} ${workDay.wishClosingHour}`) -
              new Date(`${workDay.date} ${workDay.wishEntryHour}`)) /
            1000 /
            60 /
            60;
        });
        return branchinfo;
      });

      const branchWithoutSecurity = branchHours.filter(
        (branch) => branch.hours < 168
      );

      return branchWithoutSecurity;
    } catch (err) {
      next(err);
    }
  }

  static async serviceBranchOfficeWithoutWorkDay(req, next) {
    /// xxxxx
    try {
      const branches = await BranchOficce.findAll({
        include: {
          association: BranchOficce.calendar,
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
    /// xxxxxxx
    try {
      const branches = await BranchOficce.findAll({
        include: {
          association: BranchOficce.security,
        },
      });

      const branchWithOutWorkDay = branches.filter(
        (branch) => branch.securities.length === 0
      );
      return branchWithOutWorkDay;
    } catch (err) {
      next(err);
    }
  }

  //xxxxxxxx
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

module.exports= OfficeServices