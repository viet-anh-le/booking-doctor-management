const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    rating: Number,
    exp: Number,
    address: String,
    review: String,
    status: String,
    avatar: String,
    specialization: Array,
    providerGender: String,
    availableSlots:	Array,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
)

const Account = mongoose.model('Doctor', doctorSchema, "doctors");

module.exports = Account;