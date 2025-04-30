const mongoose = require("mongoose");

const roomChatSchema = new mongoose.Schema(
  {
    users: Array,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
)

const RoomChat = mongoose.model('RoomChat', roomChatSchema, "roomChats");

module.exports = RoomChat;