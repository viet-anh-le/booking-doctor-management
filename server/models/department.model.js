const mongoose = require("mongoose");

const departmentScheme = new mongoose.Schema(
  {
    name: String,
    description: String,
    address: String,
    phone: String,
    services: Array,
    deleted: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  }
)

const Department = mongoose.model('Department', departmentScheme, "departments");

module.exports = Department;