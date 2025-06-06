const Doctor = require("../../models/doctor.model");
const Hospital = require("../../models/hospital.model");

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
  const doctorsWithHospitals = await Promise.all(
    doctors.map(async (doc) => {
      let hospital = null;
      if (doc.address) {
        hospital = await Hospital.findById(doc.address);
      }
      return {
        ...doc.toObject(),
        address: hospital
      };
    })
  );
  res.json(doctorsWithHospitals);
}


