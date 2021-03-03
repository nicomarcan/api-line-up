const db = require("../models");
const Reward = db.rewards;

// Create and Save a new reward
exports.create = async (req, res) => {

  Reward.create(req.body)
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
          err.message || "Some error occurred while creating the reward."
      });
    });
};

exports.findAll = (req, res) => {
  Reward.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rewards."
      });
    });
};
