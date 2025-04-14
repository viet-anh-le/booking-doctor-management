const md5 = require("md5");
const Account = require("../../models/account.model");

// [POST] /auth/login
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await Account.findOne({
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

  res.cookie("token", user.token, {
    httpOnly: true,
    secure: true, // 🔥 BẮT BUỘC khi chạy trên HTTPS (ví dụ Vercel)
    sameSite: "None", // 🔥 BẮT BUỘC khi frontend và backend khác domain
    maxAge: 24 * 60 * 60 * 1000 // ví dụ: 1 ngày
  }); //Lưu token vào cookie
  res.json({
    status: 200,
    message: "SUCCESS"
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
