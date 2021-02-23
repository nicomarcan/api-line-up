const { check } = require("express-validator");
const auth = require("../middleware/auth");

module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", [
    check("email", "Please Enter a Valid email")
      .isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    }),
    check("firstname", "Please Enter a Valid firstname")
      .isString(),
    check("lastname", "Please Enter a Valid lastname")
      .isString(),
  ], users.create);

  // Retrieve all Users
  router.get("/", auth, users.findAll);

  // Login User
  router.post("/login", [
    check("email", "Please Enter a Valid email")
      .isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    }),
  ], users.login);

  router.post("/editFields", auth, users.editFields);
  router.post("/finishTraining",
    [
      check("id", "Please Enter a valid training id")
        .isNumeric(),
      check("score", "Please enter a valid score")
        .isNumeric(),
    ], auth, users.finishTraining);

  app.use('/api/users', router);
}