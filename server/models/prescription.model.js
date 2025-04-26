const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    app_id: String,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
)

const Prescription = mongoose.model('Prescription', prescriptionSchema, "prescriptions");

module.exports = Prescription;