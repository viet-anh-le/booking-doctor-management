const md5 = require("md5");
const DoctorAccount = require("../../models/doctor.model");
const Hospital = require("../../models/hospital.model");

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
  const hospital = await Hospital.findById(user.address);
  res.json({
    status: 200,
    message: "SUCCESS",
    user: user,
    hospital: hospital
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

module.exports.edit = async (req, res) => {
  const updateData = { ...req.body };
  if (updateData.password === undefined) {
    delete updateData.password;
  }
  await DoctorAccount.updateOne({
    _id: req.params.id
  }, updateData);
  res.json({
    status: 200,
    message: "UPDATE ACCOUNT SUCCESS"
  })
}

// [GET] /auth/me
module.exports.me = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const account = await DoctorAccount.findOne({ token, deleted: false });
  if (!account) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.json({
    status: 200,
    user: account
  });
};
