const hospitalRoutes = require("./hospital.route");
const departmentRoutes = require("./department.route");
const accountRoutes = require("./account.route");
const serviceRoutes = require("./service.route");
const invoiceRoutes = require("./invoice.route");
const authRoutes = require("./auth.route");
const adminAccountRoutes = require("./adminAccount.route");
const statRoutes = require("./stat.route");
const appointmentLog = require("./appointmentLog.route");
const patientRoutes = require("./patient.route");

module.exports = (app) => {
  app.use("/api/admin/hospital", hospitalRoutes);

  app.use("/api/admin/department", departmentRoutes);

  app.use("/api/admin/accounts", accountRoutes);

  app.use("/api/admin/admin-accounts", adminAccountRoutes);

  app.use("/api/admin/service", serviceRoutes);

  app.use("/api/admin/invoice", invoiceRoutes);

  app.use("/api/admin/stat", statRoutes);

  app.use("/api/admin/auth", authRoutes);

  app.use("/api/admin/appointment-log", appointmentLog);

  app.use("/api/admin/patient-accounts", patientRoutes);
}