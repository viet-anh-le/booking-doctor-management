const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    ppu: Number,
    status: String,
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