const db = require("../models");
const Training = db.trainings;

// Create and Save a new training
exports.create = async (req, res) => {

  Training.create(req.body)
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
          err.message || "Some error occurred while creating the training."
      });
    });
};

exports.findAll = (req, res) => {
  Training.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving trainings."
      });
    });
};
