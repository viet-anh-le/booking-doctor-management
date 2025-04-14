const authDoctorRoutes = require("./auth.route");
const scheduleDoctorRoutes = require("./schedule.route");
const appointmentRoutes = require("./appointment.route");

module.exports = (app) => {
  app.use("/api/doctor/auth", authDoctorRoutes);

  app.use("/api/doctor/schedule", scheduleDoctorRoutes);

  app.use("/api/doctor/appointment", appointmentRoutes);
}