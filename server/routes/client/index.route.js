const authMiddleware = require("../../middlewares/client/auth.middleware");
const authRoutes = require("./auth.route");
const dashboardRoutes = require("./dashboard.route");
const doctorRoutes = require("./doctor.route");
const accountRoutes = require("./account.route");
const appointmentRoutes = require("./appointment.route");
const chatRoutes = require("./chat.route");
const invoiceRoutes = require("./invoice.route");

module.exports = (app) => {
  app.use("/api/dashboard", 
    authMiddleware.requireAuth,
    dashboardRoutes
  );

  app.use("/api/listdoctor", 
    doctorRoutes
  );

  app.use("/api/appointments", 
    appointmentRoutes
  );

  app.use("/api/accounts", 
    authMiddleware.requireAuth,
    accountRoutes
  );

  app.use("/api/chat", 
    chatRoutes
  );

  app.use("/api/invoice", 
    invoiceRoutes
  );

  app.use("/api/auth", authRoutes);
}