const Appointment = require("../../models/appointment.model");
const Doctor = require("../../models/doctor.model");
const Service = require("../../models/service.model");

// [GET] /appointments/:id
module.exports.index = async (req, res) => {
  const client_id = req.params.id;
  let find = {
    client_id: client_id,
    statusPaid: true,
    deleted: false
  }

  const appointments = await Appointment.find(find);
  const appointmentsSend = await Promise.all(appointments.map(async (appointment) => {
    const doctor = await Doctor.findOne({ _id: appointment.doctor_id });
    const serviceIds = appointment.services;
    // console.log(serviceIds);
    const services = await Service.find({ _id: { $in: serviceIds } });
    const servicesData = services.map(service => service.name);
    appointment.services = servicesData;
    return {
      appointment: appointment,
      doctor_name: doctor.fullName,
    }
  }))
  return res.json({
    status: 200,
    data: appointmentsSend
  })
}
