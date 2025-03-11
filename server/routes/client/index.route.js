const authMiddleware = require("../../middlewares/client/auth.middleware");
const authRoutes = require("./auth.route");
const dashboardRoutes = require("./dashboard.route");

module.exports = (app) => {
  app.use("/dashboard", 
    authMiddleware.requireAuth,
    dashboardRoutes
  );

  app.use("/auth", authRoutes);
}