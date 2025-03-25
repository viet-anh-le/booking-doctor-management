const md5 = require("md5");
const Account = require("../../models/account.model")

// [GET] /accounts
module.exports.index = async (req, res) => {
  console.log(email);
  let find = {
    email: email,
    deleted: false
  }

  const records = await Account.findOne(find).select("-password -token");

  res.json(records);
}

// [POST] /accounts/create
module.exports.create = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false
  });

  if (emailExist) {
    res.json({
      status: 400,
      message: "Email existed"
    });
    return;
  }
  else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    await record.save();
    res.json({
      status: 200,
      message: "Create success"
    })
  }
}
