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
  const { Op } = require("sequelize");
class SecuritiesServices {
     // USAR ESTA, PASARLE NAME DE OFFICE, ID GUARDIA
  static async serviceRemoveSecurityByOffice(req, next) {
    try {
      const office = await BranchOficce.findOne({
        where: {
          name: req.params.name,
        },
      });
      const security = await Securities.findOne({
        where: {
          id: req.params.id,
        },
      });
      office.removeSecurity(security);
      return office;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetOneSecurities(req, next) {
    const [name, lastName] = req.params.name.split(" ");
    try {
      const oneSecurity = await Securities.findAll({
        where: {
          [Op.or]: [{ name: name }, { name: name, lastName: lastName }],
        },
      });
      return oneSecurity;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetAllSecurities(next) {
    try {
      const allSecurities = await Securities.findAll();
      return allSecurities;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetOneSecurityById(req, next) {
    try {
      const oneSecurity = await Securities.findAll({
        where: {
          id: req.params.id,
        },
      });
      return oneSecurity;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetOneSecurityByCuil(req, next) {
    try {
      const oneSecurityCuil = await Securities.findAll({
        where: {
          CUIL: req.params.cuil,
        },
      });
      return oneSecurityCuil;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetAllSecuritiesByOffice(req, next) {
    //xxxxxxxxxxxx
    try {
      const securityList = await BranchOficce.findAll({
        where: { name: req.params.name },
        include: {
          association: BranchOficce.security,
          where: {
            status: true,
          },
        },
      });

      return securityList;
    } catch (err) {
      next(err);
    }
  }

  static async serviceGetAllSecuritiesByProvincie(req, next) {
    ///xxxxxxxxxx
    try {
      const provincieBranch = await BranchOficce.findAll({
        where: {
          name: req.params.name,
        },
      });

      const provincieId = provincieBranch[0].provincyId;
      const securities = await Securities.findAll({
        include: {
          association: Securities.provincie,
          where: {
            id: provincieId,
          },
        },
      });
      return securities;
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async serviceGetSecuritiesByDistance(req, next) {
    //xxxxxx
    const { y, x } = req.body;
    const { id } = req.params;

    let orderedSecurities = [];
    let min;

    try {
      let securities = await Securities.findAll({
        include: {
          association: Securities.provincie,
          where: {
            id: id,
          },
        },
      });

      securities = securities.map((securitie) => {
        const dist = distance(y, x, securitie.y, securitie.x);
        securitie.dist = dist;
        console.log("aca", y, x);
        return securitie;
      });

      while (securities[0]) {
        min = securities[0];
        securities.forEach((security) => {
          if (min.dist > security.dist) min = security;
        });
        securities = securities.filter((security) => security.id != min.id);
        orderedSecurities.push(min);
      }

      return orderedSecurities.slice(0, 5);
    } catch (error) {
      next(error);
    }
  }

  static async getImageSecurity(req, next) {
    //xxxxxx
    try {
      const image = WorkDay.findAll({
        where: {
          id: req.params.id,
        },
        include: {
          attributes: ["imageSecurity"],
        },
      });
      return image;
    } catch (err) {
      next(err);
    }
  }

  static async servicesGetSecuritiesDisabled(req, next) {
    try {
      const securitiesDisabled = await Disabled.findAll({
        where: { type: "securities" },
      });
      return securitiesDisabled;
    } catch (err) {
      next(err);
    }
  }

  static async serviceAddSecurity(req, next) {
    //xxxxxxxxxxxxxxxxxxxx
    
    try {
      const provincies = await Provincies.findOne({
        where: {
          name: req.body.provincie,
        },
      });
      const security = await Securities.create(req.body);
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

  static async serviceEditSecurity(req, next) {
    try {
      const [rows, security] = await Securities.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true,
      });
      return security;
    } catch (err) {
      next(err);
    }
  }

  static async serviceEditSecurityStatus(req, next) {
    const { status } = req.body;
    const { id } = req.params;
    try {
      const [rows, security] = await Securities.update(
        { status: status },
        { where: { id: id } }
      );
      return security;
    } catch (error) {
      next(error);
    }
  }

}

module.exports= SecuritiesServices