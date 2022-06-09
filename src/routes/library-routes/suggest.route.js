const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const bearerAuth = require("../../middlewares/auth/bearer.auth");
const ACL = require("../../middlewares/auth/ACL.auth");

const addBookController = async (req, res) => {
  try {
    const newSuggestion = {
      genre: req.body.genre,
      introduction: req.body.introduction,
      name: req.body.name,
      img_url: req.body.img_url,
      book_url: req.body.book_url,
      publish_date: req.body.publish_date,
      suggestion: true,
    };
    const added = await database.books.create(newSuggestion);
    res
      .status(201)
      .send(`You have successfully added a this book to your suggestions list`);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.post(
  "/suggest-book",
  bearerAuth,
  ACL("suggest"),
  addBookController
);
