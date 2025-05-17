const md5 = require("md5");
const Account = require("../../models/account.model")

// [GET] /accounts/:email
module.exports.index = async (req, res) => {
  const email = req.params.email;
  let find = {
    email: email,
    deleted: false
  }

  const records = await Account.findOne(find).select("-password -token");

  res.json(records);
}

// [GET] /accounts/profile/:id
module.exports.profile = async (req, res) => {
  const _id = req.params.id;
  let find = {
    _id: _id,
    deleted: false
  }

  const records = await Account.findOne(find).select("profiles");
  if (records) {
    const profilesData = await Promise.all(records.profiles.map(async (profile_id) => {
      const account = await Account.findOne({ _id: profile_id });
      return account;
    }))
    res.json({
      status: 200,
      message: "Get profile success",
      data: profilesData
    });
  }
  else{
    res.json({
      status: 400,
      message: "Profile not found"
    })
  }
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
