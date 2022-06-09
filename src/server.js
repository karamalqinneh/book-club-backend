"use strict";

// Server Setup
const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Routes & Dependencies
const authRoutes = require("./routes/auth-routes/index");
const readingListRoutes = require("./routes/readingList-routes/index");
const libraryRoutes = require("./routes/library-routes/index");
require("./discussion-app/main.app")(io);
const errorHandler = require("./middlewares/error-handlers/500");
const notFoundHandler = require("./middlewares/error-handlers/404");

// Middlewares
app.use(cors());
app.use(express.json());

// Routers
app.get("/", (req, res) => {
  res.status(200).send("server is up and running");
});
app.use(authRoutes);
app.use(readingListRoutes);
app.use(libraryRoutes);

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
