const createError = require("http-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

//Routers
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

//Global middlewares
app.use(logger("dev"));
app.use(express.json())
app.use(cors())
app.use(
  express.urlencoded({
    extended:false
  })
)

//Routes
app.use("/", indexRouter);
app.use("/users", authRouter);

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

//app port listener
// Comment this block on development to do the tests
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server initialized on port ${process.env.SERVER_PORT} `);
  });

module.exports = app;
