const Department = require("../../models/department.model");
const Hospital = require("../../models/hospitial.model");

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
