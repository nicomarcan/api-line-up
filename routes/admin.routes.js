const { check } = require("express-validator");

module.exports = app => {
  const admin = require("../controllers/admin.controller.js");

  var router = require("express").Router();

  // Login Admin
  router.post("/login", [
    check("email", "Please Enter a Valid email")
      .isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ], admin.login);

  app.use('/api/admin', router);
}