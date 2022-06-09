const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const bearerAuth = require("../../middlewares/auth/bearer.auth");
const ACL = require("../../middlewares/auth/ACL.auth");

const removeBookController = async (req, res) => {
  try {
    const toRemove = await database.reading_list.findOne({
      where: { user_id: req.user.user_id, book_id: req.params.id },
    });
    if (toRemove) {
      await database.reading_list.destroy({
        where: { user_id: req.user.user_id, book_id: req.params.id },
      });

      res.status(201).json({ message: "deleted successfully" });
    } else {
      res.status(500).json(`the book doesn't exsist`);
    }
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.delete(
  "/remove-reading-list/:id",
  bearerAuth,
  ACL("reading-list"),
  removeBookController
);
