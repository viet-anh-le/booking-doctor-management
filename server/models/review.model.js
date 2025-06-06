const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    doctor_id: String,
    reviewer: String,
    description: String,
    rating: Number,
    client_name: String,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  }, {
    timestamps: true
  }
)

const Review = mongoose.model('Review', reviewSchema, "reviews");

module.exports = Review;