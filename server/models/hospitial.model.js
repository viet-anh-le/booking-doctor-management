const mongoose = require("mongoose");

const hospitalScheme = new mongoose.Schema(
  {
    name: String,
    province: String,
    district: String,
    logo: String,
    departments: Array,
    type: String,
    deleted: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  }
)

const Hospital = mongoose.model('Hospital', hospitalScheme, "hospitals");

module.exports = Hospital;