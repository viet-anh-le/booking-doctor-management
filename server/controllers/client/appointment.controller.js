// [GET] /dashboard
module.exports.index = async (req, res) => {
  res.json({
    status: 200,
    message: "OK"
  })
}
