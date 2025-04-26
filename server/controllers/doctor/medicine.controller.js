const Medicine = require("../../models/medicine.model");

// [GET] /doctor/medicine/:appId
module.exports.index = async (req, res) => {
  const appId = req.params.appId;
  let find = {
    app_id: appId,
    deleted: false
  }
  const prescription = await Medicine.find(find);
  res.json(prescription);
}

// [POST] /doctor/medicine/create/:appId
module.exports.create = async (req, res) => {
  const appId = req.params.appId;
  const record = new Medicine({
    app_id: appId,
    name: req.body.name,
    unit: req.body.unit,
    quantity: req.body.quantity,
    usage: req.body.usage
  });
  await record.save();
  res.json({
    status: 200,
    id: record._id,
    message: "CREATE MEDICINE SUCCESS"
  })
}

// [PATCH] /doctor/medicine/edit/:id
module.exports.edit = async (req, res) => {
  await Medicine.updateOne({
    _id: req.params.id
  }, req.body);
  res.json({
    status: 200
  })
}

