const md5 = require("md5");
const DoctorAccount = require("../../models/doctor.model");

// [POST] /doctor/auth/login
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await DoctorAccount.findOne({
    email: email,
    deleted: false
  });

  if (!user){
    res.json({
      status: 400,
      message: "Email not found"
    })
    return;
  }
  
  if (md5(password) != user.password){
    res.json({
      status: 400,
      message: "Wrong password"
    })
    return;
  }

  res.cookie("token", user.token); //Lưu token vào cookie
  res.json({
    status: 200,
    message: "SUCCESS",
    user: user
  })
}

module.exports.logout = (req, res) => {
  //Xoá token trong cookie
  res.clearCookie("token");
  res.json({
    status: 200,
    message: "Log out success"
  })
}
