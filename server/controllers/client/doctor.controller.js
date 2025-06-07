const Doctor = require("../../models/doctor.model");
const Hospital = require("../../models/hospital.model");

// [GET] /listdoctor/doctorInfo/:id
module.exports.index = async (req, res) => {
  const doctor_id = req.params.id;
  const doctor = await Doctor.findById(doctor_id).select("-token -password");
  res.json({
    status: 200,
    data: doctor
  })
}

// [GET] /listdoctor?query
module.exports.getByQuery = async (req, res) => {
  const hospitalId = req.query.hospitalId;
  const keyword = req.query.query?.toLowerCase()?.trim();
  let find = {
    deleted: false
  }
  if (hospitalId) find.address = hospitalId;

  // Lấy tất cả doctor theo điều kiện ban đầu
  const doctors = await Doctor.find(find);
  if (keyword){

  }
  
  // Lọc doctor dựa trên keyword nếu có
  const filteredDoctors = await Promise.all(
    doctors.map(async (doc) => {
      let hospital = null;
      if (doc.address) {
        hospital = await Hospital.findById(doc.address);
      }

      const nameMatch = doc.fullName?.toLowerCase().includes(keyword);
      const specMatch = doc.specialization?.some(spec => spec.toLowerCase().includes(keyword));
      const hospitalMatch = hospital?.name?.toLowerCase().includes(keyword);

      // Nếu không có keyword, hoặc keyword khớp bất kỳ field nào
      if (!keyword || nameMatch || specMatch || hospitalMatch) {
        return {
          ...doc.toObject(),
          address: hospital
        };
      }

      return null; // Không match
    })
  );

  // Bỏ qua các kết quả null
  const doctorsWithHospitals = filteredDoctors.filter(d => d !== null);

  res.json(doctorsWithHospitals);
}

// [GET] /listdoctor/:spec
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


