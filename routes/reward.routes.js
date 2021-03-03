const { check } = require("express-validator");
const auth = require("../middleware/auth");

module.exports = app => {
  const reward = require("../controllers/reward.controller.js");

  var router = require("express").Router();

  // Create a new Admin
  router.post("/", [
    check("name", "Please Enter a valid name")
      .isString(),
    check("description", "Please enter a valid description")
    .isString(), 
    check("imageURL", "Please enter a valid imageURL")
    .isString(),
    check("score", "Please enter a valid score")
    .isNumeric()
  ], reward.create);

  router.get("/", auth, reward.findAll);


  app.use('/api/rewards', auth, router);
}