const { check } = require("express-validator");
const auth = require("../middleware/auth");

module.exports = app => {
  const training = require("../controllers/training.controller.js");

  var router = require("express").Router();

  // Create a new Admin
  router.post("/", [
    check("name", "Please Enter a valid name")
      .isString(),
    check("description", "Please enter a valid description")
    .isString(), 
    check("videoURL", "Please enter a valid videoURL")
    .isString()
  ], training.create);

  router.get("/", auth, training.findAll);


  app.use('/api/trainings', auth, router);
}