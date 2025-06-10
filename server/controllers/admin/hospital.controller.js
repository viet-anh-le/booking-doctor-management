const Hospital = require("../../models/hospital.model");
const Doctor = require("../../models/doctor.model");
const Department = require("../../models/department.model");

// [GET] /hospital/:type
module.exports.index = async (req, res) => {
  const records = await Hospital.find({
    type: req.params.type
  });
  res.json({
    status: 200,
    data: records
  });
}


// [POST] /hospital/create
module.exports.create = async (req, res) => {
  const record = new Hospital(req.body);
  record.logo = req.body.logo[0];
  await record.save();
  res.json({
    status: 200,
    message: "CREATE HOSPITAL SUCCESS"
  })
}

// [PATCH] /hospital/edit/:id
module.exports.edit = async (req, res) => {
  const {logo, ...updateData} = req.body;
  if (req.body.logo) updateData.logo = req.body.logo[0];
  await Hospital.updateOne({
    _id: req.params.id
  }, updateData);
  res.json({
    status: 200,
    message: "UPDATE HOSPITAL SUCCESS"
  })
}

// [PATCH] /hospital/delete/:id
module.exports.delete = async (req, res) => {
  const hospital = await Hospital.findById(req.params.id);
  await Hospital.updateOne({
    _id: req.params.id
  }, req.body);

  await Doctor.updateMany(
    { address: req.params.id },
    { $set: { deleted: true } }
  );

  if (hospital.departments && hospital.departments.length > 0) {
    await Department.updateMany(
      { _id: { $in: hospital.departments } },
      { $set: { deleted: true } }
    );
  }
  res.json({
    status: 200
  })
}