const Model = require("./../models");

const convertMethod = (method) => {
  switch (method) {
    case "GET":
      return "R";
    case "POST":
      return "C";
    case "PUT":
      return "U";
    case "DELETE":
      return "D";
  }
};
const accessMiddleware = async (req, res, next) => {
  try {
    let path = req.path.split("/");
    let newpath = path.slice(1).join(" ");
    let method = req.method;
    method = convertMethod(method);

    const role = await Model.RoleAccess.findAll({
      where: {
        roleiD: req.account.role_id,
      },
      include: [
        {
          model: Model.Access,
          as: "access",
        },
      ],
    });

    const roleAccess = role.map((el) => {
      return {
        path: el.access.name,
        group: el.group.split(""),
      };
    });

    const check = roleAccess.filter(
      (el) =>
        el.path === newpath &&
        el.group.filter((el2) => el2 === method).length > 0
    );

    if (check.length > 0) {
      return next();
    }

    return res.sendData(
      403,
      "Access Forbidden, You can access this route " + path
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  accessMiddleware,
};
