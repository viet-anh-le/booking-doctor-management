const hospitalRoutes = require("./hospital.route");
const departmentRoutes = require("./department.route");
const accountRoutes = require("./account.route");
const serviceRoutes = require("./service.route");

module.exports = (app) => {
  app.use("/api/admin/hospital", hospitalRoutes);

  app.use("/api/admin/department", departmentRoutes);

  app.use("/api/admin/accounts", accountRoutes);

  app.use("/api/admin/service", serviceRoutes);
}