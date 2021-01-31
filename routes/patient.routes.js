const {check} = require("express-validator");
const auth = require("../middleware/auth");

module.exports = app => {
  const patients = require("../controllers/patients.controller.js");

  var router = require("express").Router();

  // Create a new patient
  router.post("/",    [
    check("dni", "Please Enter a valid dni").isNumeric(),
    check("firstname", "Please enter a valid firstname").isString(),
    check("lastname", "Please enter a valid lastname").isString(),
    check("birthDate", "Please enter a valid birthDate").isNumeric()
], patients.create);

// Retrieve all patients
router.get("/", auth , patients.findAll);

app.use('/api/patients', auth, router);

}