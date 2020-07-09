const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("../routes");
const errorHandler = require("../services/errorService");
const appError = require("../utils/appError");
module.exports = async (app) => {
  app.use(
    cors({
      exposedHeaders: ["Content-Type", "x-token", "x-refresh-token"]
    })
  );
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api/user", routes.userRoute);

  // if nothing matches the above routes, then we have to catch it because it's invalid route
  app.all('*', (req, res, next) => {
    next(new appError(`Route ${req.originalUrl} is invalid`,'NOT_FOUND', 404));
  });

  // global error handler middleware
  app.use(errorHandler);
};
