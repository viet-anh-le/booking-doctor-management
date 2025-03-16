const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    doctor_id: String,
    date: String,
    time: Number,
    maxBooking: Number,
    sumBooking: Number,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
)

const Schedule = mongoose.model('Schedule', doctorSchema, "schedules");

module.exports = Account;