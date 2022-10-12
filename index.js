require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 5555;

global.__basedir = __dirname;
var corsOptions = {
  origin: `http://${hostname}:${port}/`,
};

const Route = require("../INFINITY/app/Routes/AdminRoutes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors(corsOptions));

app.use("/admin/api/v1/", Route);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
