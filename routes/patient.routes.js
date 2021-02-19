const { check } = require("express-validator");
const auth = require("../middleware/auth");

module.exports = app => {
  const patients = require("../controllers/patients.controller.js");

  var router = require("express").Router();

  // Create a new patient
  router.post("/", [
    check("firstname", "Please enter a valid firstname").isString(),
    check("lastname", "Please enter a valid lastname").isString(),
    check("email", "Please enter a valid email").isEmail(),
  ], patients.create);

  // Retrieve all patients
  router.get("/", auth, patients.findAll);
  router.get("/pending", auth, patients.findPending);
  router.post("/approve", auth, patients.approve);
  router.post("/editFields", auth, patients.editFields);


  //create patient session
  router.post("/createSession", [
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ], patients.createSession);

  //login patient
  router.post("/login", [
    check("email", "Please Enter a Valid email")
      .isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ], patients.login);

  app.use('/api/patients', router);

}