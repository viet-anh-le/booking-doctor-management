const authDoctorRoutes = require("./auth.route");
const scheduleDoctorRoutes = require("./schedule.route");
const appointmentRoutes = require("./appointment.route");
const medicineRoutes = require("./medicine.route")

module.exports = (app) => {
  app.use("/api/doctor/auth", authDoctorRoutes);

  app.use("/api/doctor/schedule", scheduleDoctorRoutes);

  app.use("/api/doctor/appointment", appointmentRoutes);

  app.use("/api/doctor/medicine", medicineRoutes);
}