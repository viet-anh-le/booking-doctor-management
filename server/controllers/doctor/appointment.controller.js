const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const utc = require("dayjs/plugin/utc");
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const Appointment = require("../../models/appointment.model");
const Account = require("../../models/account.model");

// [GET] /doctor/appointment/:id
module.exports.index = async (req, res) => {
  const id = req.params.id;

  let find = {
    doctor_id: id,
    statusPaid: true,
    status: { $ne: "reject" },
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

// [GET] /doctor/appointment/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  let find = {
    _id: id,
    deleted: false
  }

  const appointment = await Appointment.findOne(find);
  const client = await Account.findOne({ _id: appointment.client_id });
  return res.json({
    appointment: appointment,
    client_name: client.fullName,
    client_phone: client.phone,
    client_email: client.email
  })
}

// [POST] /doctor/appointment/create/:id
module.exports.create = async (req, res) => {
  const record = new Appointment({
    ...req.body,
    date: dayjs(req.body.date, "DD/MM/YYYY").toDate(),
    status: "pending",
  });
  await record.save();
  res.json({
    status: 200,
    _id: record._id,
    message: "CREATE APPOINTMENT SUCCESS"
  })
}

// [PATCH] /doctor/appointment/edit/:id
module.exports.edit = async (req, res) => {
  const { updated: updatedFromBody, ...restBody } = req.body;

  let updated;
  const contentType = req.headers['content-type'];
  console.log(contentType);
  if (contentType && contentType.includes('multipart/form-data')) {
    if (req.body.updated) {
      updated = JSON.parse(req.body.updated);
      updated.updatedAt = new Date();
    }
  }
  else if (contentType && contentType.includes('application/json')) {
    updated = updatedFromBody;
    updated.updatedAt = new Date();
  }

  if (req.body.services) {
    const services = JSON.parse(req.body.services);
    await Appointment.updateOne(
      { _id: req.params.id },
      {
        ...restBody,
        services: services,
        $push: { updated }
      }
    );
    return res.json({ status: 200 });
  }

  await Appointment.updateOne(
    { _id: req.params.id },
    {
      ...restBody,
      $push: { updated }
    }
  );

  res.json({ status: 200 });

}

