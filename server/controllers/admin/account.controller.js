const md5 = require("md5");
const Doctor = require("../../models/doctor.model");

// [GET] /accounts
module.exports.index = async (req, res) => {
  const records = await Doctor.find().select("-password -token");
  res.json(records);
}

// [POST] /accounts/create
module.exports.create = async (req, res) => {
  const emailExist = await Doctor.findOne({
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
    req.body.avatar = req.body.avatar[0];
    req.body.specialization = JSON.parse(req.body.specialization);
    const record = new Doctor(req.body);
    await record.save();
    res.json({
      status: 200,
      message: "Create success"
    })
  }
}
