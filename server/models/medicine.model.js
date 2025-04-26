const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    app_id: String,
    name: String,
    unit: String,
    quantity: Number,
    usage: String,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
)

const Medicine = mongoose.model('Medicine', medicineSchema, "medicines");

module.exports = Medicine;