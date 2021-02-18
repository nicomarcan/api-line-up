const { check } = require("express-validator");
const auth = require("../middleware/auth");

module.exports = app => {
  const attentions = require("../controllers/attention.controller.js");

  var router = require("express").Router();

  // Create a new patient
  router.post("/", auth, attentions.create);
  router.get("/", auth, attentions.findAttentions);

  app.use('/api/attentions', auth, router);

}