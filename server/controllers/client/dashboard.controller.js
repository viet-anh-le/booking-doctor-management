const md5 = require("md5");
const Account = require("../../models/account.model");

// [GET] /dashboard
module.exports.index = async (req, res) => {
  res.json({
    status: 200,
    message: "OK"
  })
}
