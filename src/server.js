"use strict";

// Server Setup
const express = require("express");
const app = express();
const cors = require("cors");

// Routes & Dependencies
const errorHandler = require("./middlewares/error-handlers/500");
const notFoundHandler = require("./middlewares/error-handlers/404");

// Middlewares
app.use(cors());
app.use(express.json());

// Routers

app.get("/", (req, res) => {
  res.status(200).send("server is up and running");
});

// Error Handlers

app.use("*", notFoundHandler);
app.use(errorHandler);

// connect to sequelize & listen for requests
const start = (port) => {
  app.listen(port, () => console.log(`Running on Port ${port}`));
};

module.exports = {
  app: app,
  start: start,
};
