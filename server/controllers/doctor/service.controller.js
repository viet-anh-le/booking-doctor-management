const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const utc = require("dayjs/plugin/utc");
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const Service = require("../../models/service.model.js");
const Doctor = require("../../models/doctor.model.js");
const Hospital = require("../../models/hospital.model.js");
const Department = require("../../models/department.model.js");

//[GET] /doctor/service/:doctorId
module.exports.index = async (req, res) => {
  const doctorId = req.params.doctorId;
  let find = {
    _id: doctorId,
    deleted: false
  }
  const doctor = await Doctor.findOne(find);
  const hospital = await Hospital.findById(doctor.address);
  const departmentIds = hospital.departments;
  const departments = await Department.find({ _id: { $in: departmentIds } });
  let allServiceIds = [];
  departments.forEach(dept => {
    if (Array.isArray(dept.services)) {
      allServiceIds.push(...dept.services);
    }
  });
  const services = await Service.find({ _id: { $in: allServiceIds } });
  return res.json(services)
}

