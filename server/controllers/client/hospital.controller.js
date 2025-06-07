const Hospital = require("../../models/hospital.model");

// [GET] /hospital
module.exports.index = async (req, res) => {
  const records = await Hospital.find({
    deleted: false
  });
  res.json({
    status: 200,
    data: records
  });
}


