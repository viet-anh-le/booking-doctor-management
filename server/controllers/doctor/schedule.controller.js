const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const utc = require("dayjs/plugin/utc");
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const Schedule = require("../../models/schedule.model.js");
const DoctorAccount = require("../../models/doctor.model.js");

//[GET] /doctor/schedule/:doctorID
module.exports.index = async (req, res) => {
  const doctorId = req.params.doctorId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const selectedDate = req.query.date

  let find = {
    doctor_id: doctorId,
  }

  if (startDate && endDate){
    find.date = {
      $gte: dayjs(startDate, "DD/MM/YYYY").toDate(),
      $lte: dayjs(endDate, "DD/MM/YYYY").toDate()
    }
  }

  if (selectedDate){
    find.date = dayjs(selectedDate, "DD/MM/YYYY").toDate()
  }
  const plan = await Schedule.find(find);
  return res.json(plan)
}

//[POST] /doctor/schedule/create
module.exports.create = async (req, res) => {
  const id = req.body.doctorId;
  const user = await DoctorAccount.findOne({
    _id: id,
    deleted: false
  });
  if (!user) {
    res.json({
      status: 404,
      message: "Can't find doctor"
    });
    return;
  }

  const scheduleArr = req.body.plan;
  for (const schedule of scheduleArr) {
    let find = {
      date: dayjs(schedule.date, "DD/MM/YYYY").toDate(),
      time: schedule.range
    }
    const scheduleExist = await Schedule.findOne(find);
    if (scheduleExist) {
      return (
        res.json({
          status: 400,
          message: "Time existed"
        })
      )
    }

    const scheduleNew = new Schedule({
      doctor_id: id,
      date: dayjs(schedule.date, "DD/MM/YYYY").toDate(),
      time: schedule.range,
      maxBooking: req.body.maxBooking,
      sumBooking: req.body.sumBooking
    })
    await scheduleNew.save();
  }
  return (
    res.json({
      status: 200,
      message: "CREATE SUCCESS"
    })
  )
}

//[POST] /doctor/schedule/delete
module.exports.delete = async (req, res) => {
  const idsDeleted = req.body.idsDeleted;
  const find = {
    _id: { $in: idsDeleted }
  }
  
  await Schedule.deleteMany(find);

  return (
    res.json({
      status: 200,
      message: "DELETE SUCCESS"
    })
  )
}