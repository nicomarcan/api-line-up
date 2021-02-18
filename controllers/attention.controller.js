const db = require("../models");
const Attention = db.attentions;

// Create and Save a new patient
exports.create = async (req, res) => {

  const attention = {
    patientId: req.body.patientId,
    date: new Date(parseInt(req.body.date+'000'))
  }

  // Save Patient in the database
  Attention.create(attention)
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
          err.message || "Some error occurred while creating the attention."
      });
    });
};