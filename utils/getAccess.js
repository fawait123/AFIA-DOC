const Model = require("./../models");
const getAccess = async (roleID) => {
  try {
    let role = await Model.Role.findOne({
      where: {
        id: roleID,
      },
    });

    return role;
  } catch (error) {
    throw error;
  }
};
