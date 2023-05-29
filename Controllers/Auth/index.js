const Auth = {
  login: async (req, res) => {
    try {
      return res.send({ msg: "route login" });
    } catch (error) {}
  },
};

module.exports = Auth;
