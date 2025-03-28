const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const utc = require("dayjs/plugin/utc");
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const Appointment = require("../../models/appointment.model");
const Account = require("../../models/account.model");
const Schedule = require("../../models/schedule.model");

// [GET] /doctor/appointment/:id
module.exports.index = async (req, res) => {
  const id = req.params.id;

  let find = {
    doctor_id: id,
    deleted: false
  }

  const appointments = await Appointment.find(find);
  const appointmentsSend = await Promise.all(appointments.map(async (appointment) => {
    const client = await Account.findOne({ _id: appointment.client_id });
    return {
      appointment: appointment,
      client_name: client.fullName
    }
  }))
  return res.json(appointmentsSend)

}

// [POST] /doctor/appointment/create/:id
module.exports.create = async (req, res) => {
  const symptomImages = req.files.images ? req.files.images.map((item) => item.path) : [];
  const record = new Appointment({
    doctor_id: req.body.doctor_id,
    client_id: req.body.client_id,
    client_age: req.body.client_age,
    client_gender: req.body.client_gender,
    spec: req.body.spec,
    date: dayjs(req.body.date, "DD/MM/YYYY").toDate(),
    time: req.body.time,
    reason: req.body.reason,
    symptomImages: symptomImages
  });
  await record.save();
  const scheduleId = req.body.scheduleId;
  await Schedule.updateOne({
    _id: scheduleId
  }, { $inc: { sumBooking: 1 } });
  res.json({
    status: 200,
    message: "CREATE APPOINTMENT SUCCESS"
  })
}
