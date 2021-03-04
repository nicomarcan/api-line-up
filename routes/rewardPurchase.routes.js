const { check } = require("express-validator");
const auth = require("../middleware/auth");

module.exports = app => {
  const rewardPurchase = require("../controllers/rewardPurchase.controller.js");

  var router = require("express").Router();

  // Create a new Reward purchase
  router.post("/", [
    check("rewardId", "Please enter a valid rewardId")
    .isNumeric()
  ], rewardPurchase.create);

  router.get("/", auth, rewardPurchase.findAll);


  app.use('/api/reward-purchases', auth, router);
}