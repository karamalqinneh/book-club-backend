const express = require("express");
const router = express.Router();
const basicAuth = require("../../middlewares/auth/basic.auth");

// signin Function
function signinController(req, res) {
  res.status(200).json({
    email: req.user.email,
    token: req.user.token,
    actions: req.user.actions,
    fullName: req.user.full_name,
    id: req.user.user_id,
  });
}

module.exports = router.post("/signin", basicAuth, signinController);
