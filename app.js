// Bringing in packages
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Setting up the routers
// Both of these are provided by default by Express

// This one serves pages (ie. home page, login page, etc)
var indexRouter = require("./routes/index");
// This one serves resources (requesting user information, etc)
var usersRouter = require("./routes/users");
var scriptsRouter = require("./routes/scripts");

var app = express();

// view engine setup
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect the routers to the application
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/scripts", scriptsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
