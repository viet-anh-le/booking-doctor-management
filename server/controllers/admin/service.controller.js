const Department = require("../../models/department.model");
const Service = require("../../models/service.model");

// [GET] /service/:departmentId
module.exports.index = async (req, res) => {
  const departmentId = req.params.departmentId;
  const department = await Department.findById(departmentId);
  const records = await Service.find({ _id: { $in: department.services } });
  res.json({
    status: 200,
    data: records
  });
}


// [POST] /service/create/:departmentId
module.exports.create = async (req, res) => {
  const record = new Service(req.body);
  const department = await Department.findById(req.params.departmentId);
  department.services.push(record._id);
  await department.save();
  await record.save();
  res.json({
    status: 200,
    message: "CREATE SERVICE SUCCESS"
  })
}

// [PATCH] /service/edit/:serviceId
module.exports.edit = async (req, res) => {
  await Service.updateOne({
    _id: req.params.serviceId
  }, req.body);
  res.json({
    status: 200,
    message: "UPDATE SERVICE SUCCESS"
  })
}

// [PATCH] /service/edit/:serviceId
module.exports.delete = async (req, res) => {
  await Service.updateOne({
    _id: req.params.serviceId
  }, req.body);
  res.json({
    status: 200,
    message: "DELETE SERVICE SUCCESS"
  })
}

