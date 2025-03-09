const express = require("express");
require("dotenv").config();
const database = require("./config/database");

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Danh sách công việc");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})