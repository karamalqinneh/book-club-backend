const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const bearerAuth = require("../../middlewares/auth/bearer.auth");
const ACL = require("../../middlewares/auth/ACL.auth");

const getBooksController = async (req, res) => {
  try {
    const readingList = await database.reading_list.findAll({
      where: { user_id: req.user.user_id },
      include: [database.books],
    });
    const response = readingList.map((ele) => ele.book);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get(
  "/get-reading-list",
  bearerAuth,
  ACL("reading-list"),
  getBooksController
);
