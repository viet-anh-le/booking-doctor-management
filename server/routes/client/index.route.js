const authMiddleware = require("../../middlewares/client/auth.middleware");
const authRoutes = require("./auth.route");
const dashboardRoutes = require("./dashboard.route");
const doctorRoutes = require("./doctor.route");
const accountRoutes = require("./account.route");

module.exports = (app) => {
  app.use("/dashboard", 
    authMiddleware.requireAuth,
    dashboardRoutes
  );

  app.use("/doctor", 
    authMiddleware.requireAuth,
    doctorRoutes
  );

  app.use("/accounts", 
    authMiddleware.requireAuth,
    accountRoutes
  );

  app.use("/auth", authRoutes);
}