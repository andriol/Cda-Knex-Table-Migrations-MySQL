const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();

const cakeRoute = require("./routes/cakes");
const imageRoute = require("./routes/images");

require("dotenv").config();
const port = process.env.PORT || 8081;

const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
hbs.registerPartials(partialsPath);

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));

app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/cakes", cakeRoute);
app.use("/images", imageRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
