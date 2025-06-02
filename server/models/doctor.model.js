const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const doctorSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: () => generate.generateRandomString(20)
    },
    dob: Date,
    phone: String,
    cccd: String,
    rating: Number,
    exp: Number,
    address: String,
    review: String,
    status: String,
    avatar: String,
    specialization: Array,
    providerGender: String,
    role: String,
    friendList: [
      {
        user_id: String,
        room_id: String
      }
    ],
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
  timestamps: true
}
)

const DoctorAccount = mongoose.model('Doctor', doctorSchema, "doctors");

module.exports = DoctorAccount;