const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const bearerAuth = require("../../middlewares/auth/bearer.auth");
const ACL = require("../../middlewares/auth/ACL.auth");

const createRoomController = async (req, res) => {
  try {
    const newRoom = {
      name: req.body.name,
      book_id: req.body.book_id,
    };
    const added = await database.rooms.create(newRoom);
    res.status(201).send(`You have successfully created this room`);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.post(
  "/create-room",
  bearerAuth,
  ACL("edit-discussion"),
  createRoomController
);
