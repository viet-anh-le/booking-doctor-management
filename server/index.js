const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");

const database = require("./config/database");

const route = require("./routes/client/index.route");
const doctorRoute = require("./routes/doctor/index.route");

database.connect();

const app = express();
const port = process.env.PORT;
const frontendURL = process.env.FRONTEND_URL

const server = http.createServer(app);

const socketIO = require('socket.io')(server, {
  cors: {
    origin: frontendURL
  }
});

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

//parse application json
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: frontendURL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// Cấu hình server phục vụ ảnh từ thư mục 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes
route(app);
doctorRoute(app);

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})