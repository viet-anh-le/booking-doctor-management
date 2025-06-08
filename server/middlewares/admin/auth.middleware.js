const AdminAccount = require("../../models/adminAccount.model");

module.exports.requireAuth = async (req, res, next) => {
  if(!req.cookies.token){
    return res.json({
      status: 400,
      message: "has no token"
    })
  }
  else{
    const user = await AdminAccount.findOne({
      token: req.cookies.token
    }).select("-password");
    if(!user){
      return res.json({
        status: 400,
        message: "Wrong token"
      })
    } 
    else{
      next();
    }
  }
}