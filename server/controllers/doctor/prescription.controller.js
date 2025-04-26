const Prescription = require("../../models/prescription.model");
const Appointment = require("../../models/appointment.model");

// [POST] /doctor/prescription/create/:appId
module.exports.create = async (req, res) => {
  const appId = req.params.appId;
  const record = new Prescription({
    app_id: appId
  });
  await record.save();
  await Appointment.updateOne({
    _id: appId
  }, { prescription_id: record._id});
  res.json({
    status: 200,
    message: "CREATE PRESCRIPTION SUCCESS"
  })
}

// [PATCH] /doctor/appointment/edit/:id
module.exports.edit = async (req, res) => {
  await Appointment.updateOne({
    _id: req.params.id
  }, req.body);
  console.log(req.params.id);
  res.json({
    status: 200
  })
}

