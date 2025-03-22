const authDoctorRoutes = require("./auth.route");

module.exports = (app) => {
  app.use("/doctor/auth", authDoctorRoutes);
}