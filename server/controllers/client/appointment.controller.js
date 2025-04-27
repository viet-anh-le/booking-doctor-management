const Appointment = require("../../models/appointment.model");
const Doctor = require("../../models/doctor.model");

// [GET] /appointments/:id
module.exports.index = async (req, res) => {
  const client_id = req.params.id;
  let find = {
    client_id: client_id,
    deleted: false
  }

  const appointments = await Appointment.find(find);
  const appointmentsSend = await Promise.all(appointments.map(async (appointment) => {
    const doctor = await Doctor.findOne({ _id: appointment.doctor_id });
    return {
      appointment: appointment,
      doctor_name: doctor.fullName,
    }
  }))
  return res.json(appointmentsSend)
}
