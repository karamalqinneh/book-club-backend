const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const bearerAuth = require("../../middlewares/auth/bearer.auth");
const ACL = require("../../middlewares/auth/ACL.auth");

const addBookController = async (req, res) => {
  try {
    const newReading = {
      user_id: req.user.user_id,
      book_id: req.params.id,
    };
    const added = await database.reading_list.create(newReading);
    res
      .status(201)
      .send(`You have successfully added a this book to your reading list`);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.post(
  "/add-reading-list/:id",
  bearerAuth,
  ACL("reading-list"),
  addBookController
);
