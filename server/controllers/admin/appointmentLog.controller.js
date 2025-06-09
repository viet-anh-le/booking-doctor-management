
const Appointment = require("../../models/appointment.model");
const Account = require("../../models/account.model");
const Doctor = require("../../models/doctor.model");

// [GET] /admin/appointment-log
module.exports.index = async (req, res) => {
  const appointments = await Appointment.find().select("_id client_id doctor_id createdAt updated");
  const appointmentsSend = await Promise.all(appointments.map(async (appointment) => {
    const client = await Account.findOne({ _id: appointment.client_id });
    const doctor = await Doctor.findOne({ _id: appointment.doctor_id });
    const plainAppointment = appointment.toObject();
    return {
      ...plainAppointment,
      client_name: client?.fullName,
      doctor_name: doctor?.fullName
    }
  }))
  return res.json(appointmentsSend);
}
