const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("../routes");
const services = require("../services");

module.exports = async (app) => {
  app.use(
    cors({
      exposedHeaders: ["Content-Type", "token"]
    })
  );
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use("/api/user", routes.userRoute);

  app.use(services.ErrorService);
};
