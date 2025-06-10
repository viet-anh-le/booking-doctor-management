const Department = require("../../models/department.model");
const Hospital = require("../../models/hospital.model");
const Service = require("../../models/service.model");

// [GET] /department/:hostpitalId
module.exports.index = async (req, res) => {
  const hospitalId = req.params.hospitalId;
  const hospital = await Hospital.findById(hospitalId);
  const records = await Department.find({ _id: { $in: hospital.departments } });
  res.json({
    status: 200,
    data: records
  });
}


// [POST] /department/create/:hospitalId
module.exports.create = async (req, res) => {
  const record = new Department(req.body);
  const hospital = await Hospital.findById(req.params.hospitalId);
  hospital.departments.push(record._id);
  await hospital.save();
  await record.save();
  res.json({
    status: 200,
    message: "CREATE DEPARTMENT SUCCESS"
  })
}

// [PATCH] /department/edit/:departmentId
module.exports.edit = async (req, res) => {
  await Department.updateOne({
    _id: req.params.departmentId
  }, req.body);
  res.json({
    status: 200,
    message: "UPDATE DEPARTMENT SUCCESS"
  })
}

// [PATCH] /department/delete/:departmentId
module.exports.delete = async (req, res) => {
  const department = await Department.findById(req.params.departmentId);
  await Department.updateOne({
    _id: req.params.departmentId
  }, req.body);

  const targetServiceIds = department.services.filter(id => id.toString() !== "683d4911cc0b92e7e08538ca");
  if (department.services && department.services.length > 0) {
    await Service.updateMany(
      { _id: { $in: targetServiceIds } },
      { $set: { deleted: true } }
    );
  }
  res.json({
    status: 200,
    message: "DELETE DEPARTMENT SUCCESS"
  })
}
