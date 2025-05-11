const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: String,
    ppu: Number,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
)

const Service = mongoose.model('Service', serviceSchema, "services");

module.exports = Service;