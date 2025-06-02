const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");
const chatController = require("./controllers/client/chat.controller");
// Import cron job
const startCronJob = require('./cron/updateOverdueInvoices');

// Start cron job
startCronJob();

const database = require("./config/database");

const route = require("./routes/client/index.route");
const doctorRoute = require("./routes/doctor/index.route");
const adminRoute = require("./routes/admin/index.route");

database.connect();

const app = express();
const port = process.env.PORT;
const frontendURL = process.env.FRONTEND_URL

//parse application json
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: frontendURL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

//Routes
route(app);
doctorRoute(app);
adminRoute(app);

const server = http.createServer(app);

const socketIO = require('socket.io')(server, {
  cors: {
    origin: frontendURL
  }
});

global._io = socketIO;

chatController.index();

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})