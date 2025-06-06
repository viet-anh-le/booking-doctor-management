const Appointment = require("../../models/appointment.model");
const Doctor = require("../../models/doctor.model");
const Service = require("../../models/service.model");
const Account = require("../../models/account.model");

// [GET] /appointments/:id
module.exports.index = async (req, res) => {
  const client_id = req.params.id;
  const client = await Account.findById(client_id);
  let find = {
    client_id: {$in: [client_id, ...client.profiles]},
    statusPaid: true,
    deleted: false
  }

  const appointments = await Appointment.find(find);
  const appointmentsSend = await Promise.all(appointments.map(async (appointment) => {
    const doctor = await Doctor.findOne({ _id: appointment.doctor_id });
    const client = await Account.findOne({ _id: appointment.client_id });
    const serviceIds = appointment.services;
    // console.log(serviceIds);
    const services = await Service.find({ _id: { $in: serviceIds } });
    const servicesData = services.map(service => service.name);
    appointment.services = servicesData;
    return {
      appointment: appointment,
      doctor_name: doctor.fullName,
      client_name: client.fullName
    }
  }))
  return res.json({
    status: 200,
    data: appointmentsSend
  })
}
