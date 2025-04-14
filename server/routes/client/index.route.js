const authMiddleware = require("../../middlewares/client/auth.middleware");
const authRoutes = require("./auth.route");
const dashboardRoutes = require("./dashboard.route");
const doctorRoutes = require("./doctor.route");
const accountRoutes = require("./account.route");
const appointmentRoutes = require("./appointment.route")

module.exports = (app) => {
  app.use("/dashboard", 
    authMiddleware.requireAuth,
    dashboardRoutes
  );

  app.use("/listdoctor", 
    doctorRoutes
  );

  app.use("/appointments", 
    appointmentRoutes
  );

  app.use("/accounts", 
    authMiddleware.requireAuth,
    accountRoutes
  );

  app.use("/auth", authRoutes);
}