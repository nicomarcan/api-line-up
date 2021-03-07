const db = require("../models");
const RewardPurchase = db.rewardPurchases;

// Create and Save a new training
exports.create = async (req, res) => {

  const rewardPurchase = {
    userId: req.user.id,
    rewardId: req.body.rewardId,
    isDelivered: false
  }

  RewardPurchase.create(rewardPurchase)
    .then(data => {
      res.status(200).json(
        {
          hey: "hey",
        }
      );
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the reward purchase."
      });
    });
};

exports.findAll = (req, res) => {
  RewardPurchase.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reward purchases."
      });
    });
};
