const authDoctorRoutes = require("./auth.route");
const scheduleDoctorRoutes = require("./schedule.route");

module.exports = (app) => {
  app.use("/doctor/auth", authDoctorRoutes);

  app.use("/doctor/schedule", scheduleDoctorRoutes);
}