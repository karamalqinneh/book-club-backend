const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const bearerAuth = require("../../middlewares/auth/bearer.auth");
const ACL = require("../../middlewares/auth/ACL.auth");

const deleteRoomController = async (req, res) => {
  let toRemove = await database.rooms.destroy({
    where: { room_id: req.params.id },
  });

  if (toRemove) {
    res.status(201).json({ message: "deleted successfully" });
  } else {
    res.status(500).json(`the room doesn't exsist`);
  }
};

module.exports = router.delete(
  "/delete-room/:id",
  bearerAuth,
  ACL("edit-discussion"),
  deleteRoomController
);
