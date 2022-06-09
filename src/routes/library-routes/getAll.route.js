const express = require("express");
const router = express.Router();
const database = require("../../database/models/index");
const bearerAuth = require("../../middlewares/auth/bearer.auth");
const ACL = require("../../middlewares/auth/ACL.auth");

const getBooksController = async (req, res) => {
  try {
    const library = await database.books.findAll({
      where: { suggestion: false },
    });
    res.status(201).json(library);
  } catch (error) {
    console.log(error);
    res.status(403).send("Error occurred");
  }
};

module.exports = router.get(
  "/get-books",
  bearerAuth,
  ACL("library"),
  getBooksController
);
