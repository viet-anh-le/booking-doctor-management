const md5 = require("md5");
const Doctor = require("../../models/doctor.model");

// [GET] /accounts
module.exports.index = async (req, res) => {
  const records = await Doctor.find().select("-password -token");
  res.json(records);
}

// [GET] /accounts/doctorDetail/:doctorId
module.exports.getDetail = async (req, res) => {
  const doctorId = req.params.doctorId;
  const records = await Doctor.findOne({_id: doctorId}).select("-token");
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

// [PATCH] /accounts/doctorEdit/:doctorId
module.exports.edit = async (req, res) => {
  if (req.body.password) req.body.password = md5(req.body.password);
  if (req.body.avatar) req.body.avatar = req.body.avatar[0];
  if (req.body.specialization) req.body.specialization = JSON.parse(req.body.specialization);
  await Doctor.updateOne({
    _id: req.params.doctorId
  }, req.body);
  res.json({
    status: 200
  })
}

// [PATCH] /accounts/doctorDelete/:doctorId
module.exports.delete = async (req, res) => {
  await Doctor.updateOne({
    _id: req.params.doctorId
  }, req.body);
  res.json({
    status: 200
  })
}
