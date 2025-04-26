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
      client_name: client.fullName,
      client_phone: client.phone,
      client_email: client.email
    }
  }))
  return res.json(appointmentsSend)

}

// [POST] /doctor/appointment/create/:id
module.exports.create = async (req, res) => {
  const record = new Appointment({
    doctor_id: req.body.doctor_id,
    client_id: req.body.client_id,
    client_age: req.body.client_age,
    client_gender: req.body.client_gender,
    spec: req.body.spec,
    date: dayjs(req.body.date, "DD/MM/YYYY").toDate(),
    time: req.body.time,
    reason: req.body.reason,
    symptomImages: req.body.images,
    status: "pending"
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

// [PATCH] /doctor/appointment/edit/:id
module.exports.edit = async (req, res) => {
  await Appointment.updateOne({
    _id: req.params.id
  }, req.body);
  console.log(req.params.id);
  res.json({
    status: 200
  })
}

