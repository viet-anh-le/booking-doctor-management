const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctor_id: String,
    client_id: String,
    client_age: Number,
    client_gender: String,
    spec: String,
    date: Date,
    time: String,
    reason: String,
    symptomImages: Array,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
)

const Appointment = mongoose.model('Appointment', appointmentSchema, "appointments");

module.exports = Appointment;