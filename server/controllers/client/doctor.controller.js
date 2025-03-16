const Doctor = require("../../models/doctor.model");

// [GET] /doctor
module.exports.index = async (req, res) => {
  res.json({
    status: 200,
    message: "OK"
  })
}

// [GET] /doctor/:spec
module.exports.getBySpec = async (req, res) => {
  let find = {
    deleted: false
  }
  let spec = req.params.spec;
  spec = spec.replace("-", " ");
  let words = spec.split(/\s+/).filter(Boolean); // Tách thành mảng từ

  if (words.length > 0) {
    // Tạo regex: thay " " bằng [^\w]* để khớp với dấu đặc biệt
    let regexPattern = words.join("[^\\w]*");
    const regex = new RegExp(regexPattern, "i");

    find.specialization = { $regex: regex };
  }
  const doctors = await Doctor.find(find);
  res.json(doctors);
}


