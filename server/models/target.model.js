const mongoose = require("mongoose");

const targetSchema = new mongoose.Schema(
  {
    month: {
      type: Number, 
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
)
targetSchema.index({ month: 1, year: 1 }, { unique: true });
const Target = mongoose.model('Target', targetSchema, "targets");

module.exports = Target;