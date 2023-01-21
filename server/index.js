const net = require("net");
var express = require("express");
var app = express();
const dataProvider = require("./dataProvider/index.js");

app.set("port", process.env.PORT || 5000);
app.set("trust proxy", true);

app.use(express.static(__dirname + "/public"));

// views is directory for all template files
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", function (request, response) {
  const ipAddress = request.socket.remoteAddress;
  console.log(
    "ipAddress:",
    ipAddress,
    " req.ip:",
    request.ip,
    "req.headers['x-forwarded-for']:",
    request.headers["x-forwarded-for"]
  );
  request.params.city = request.ip; //"beijing";
  renderCityPage(request, response);
});

app.get("/api/city/:city", function (req, res) {
  dataProvider
    .getWeatherDataByLocation(req.params.city)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.send({ status: "error" });
    });
});

app.get("/api/getcitybygeocode/:latlon", function (req, res) {
  dataProvider
    .getCityByGeocode(req.params.latlon)
    .then((data) => {
      return res.json(data);
    })
    .catch(() => {
      res.send({ status: "error" });
    });
});

app.get("/city/:city", renderCityPage);
app.get("/city/:city/:city2", renderCityPage);

app.use((req, res, next) => {
  res.status(404);
  res.render("pages/404");
});

function renderCityPage(req, res) {
  let city = req.params.city;
  if (req.params.city2) {
    city = city + "/" + req.params.city2;
  }
  dataProvider
    .getWeatherDataByLocation(city)
    .then((data) => {
      console.log("DATA", data);
      res.render("pages/city", data);
    })
    .catch(() => {
      handleError(req, res);
    });
}

function handleError(req, res, error) {
  res.render("pages/error");
}

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});
