const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String, 
    token:{
      type: String,
      default: () => generate.generateRandomString(20)
    },
    phone: String,
    avatar: String,
    role: String,
    status: String,
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

const Account = mongoose.model('Account', accountSchema, "accounts");

module.exports = Account;