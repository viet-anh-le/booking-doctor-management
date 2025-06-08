const md5 = require("md5");
const AdminAccount = require("../../models/adminAccount.model")

// [GET] /accounts/:email
module.exports.index = async (req, res) => {
  const email = req.params.email;
  let find = {
    email: email,
    deleted: false
  }

  const records = await AdminAccount.findOne(find).select("-password -token");

  res.json(records);
}