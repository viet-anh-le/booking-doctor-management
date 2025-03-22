const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const database = require("./config/database");

const route = require("./routes/client/index.route");
const doctorRoute = require("./routes/doctor/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

//parse application json
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//Routes
route(app);
doctorRoute(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})