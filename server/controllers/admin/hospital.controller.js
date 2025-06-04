const Hospital = require("../../models/hospital.model");

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
