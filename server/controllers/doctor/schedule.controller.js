const Schedule = require("../../models/schedule.model.js");
const DoctorAccount = require("../../models/doctor.model.js");

module.exports.create = async (req, res) => {
  const id = req.body.doctorId;
  const user = await DoctorAccount.findOne({
    _id: id,
    deleted: false
  });
  if (!user){
    res.json({
      status: 404,
      message: "Can't find doctor"
    });
    return;
  }
  
  const scheduleArr = req.body.plan;
  scheduleArr.map(async (schedule) => {
    const scheduleNew = new Schedule({
      doctor_id: id,
      date: schedule.date,
      time: schedule.range,
      maxBooking: req.body.maxBooking,
      sumBooking: req.body.sumBooking
    })
    await scheduleNew.save();
  })
  return (
    res.json({
      status: 200,
      message: "CREATE SUCCESS"
    })
  )
}