const authDoctorRoutes = require("./auth.route");
const scheduleDoctorRoutes = require("./schedule.route");
const appointmentRoutes = require("./appointment.route");

module.exports = (app) => {
  app.use("/doctor/auth", authDoctorRoutes);

  app.use("/doctor/schedule", scheduleDoctorRoutes);

  app.use("/doctor/appointment", appointmentRoutes);
}