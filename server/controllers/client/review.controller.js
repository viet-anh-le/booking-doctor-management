const Review = require("../../models/review.model")

// [GET] /reviews/:doctorId
module.exports.index = async (req, res) => {
  const doctorId = req.params.doctorId;

  const records = await Review.find({
    doctor_id: doctorId,
    deleted: false
  });

  res.json(records);
}

// [POST] /reviews/create
module.exports.create = async (req, res) => {
  console.log(req.body);
  req.body.rating = parseInt(req.body.rating);
  const record = new Review(req.body);
  await record.save();
  res.json({
    status: 200,
    message: "CREATE REVIEW SUCCESS",
    dayCreated: record.createdAt
  })
}