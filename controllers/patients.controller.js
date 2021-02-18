const db = require("../models");
const Patient = db.patients;
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");


// Create and Save a new patient
exports.create = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const patient = {
    ...req.body,
    userId: req.user.id,
    isApproved: false
  }
  // Save Patient in the database
  Patient.create(patient)
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
          err.message || "Some error occurred while creating the patient."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  Patient.findAll({where: {userId: req.user.id}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patients."
      });
    });
};

exports.findPending = (req, res) => {
  Patient.findAll({where: {isApproved: false}})
    .then(data => {      
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pending patients."
      });
    });
};


//approve patient
exports.approve = async (req, res) => {
  const id = Math.random().toString().substring(2, 10);

  // Approve Patient in the database
  Patient.update({ isApproved: true, lineUpId: id}, { where: { id: req.body.id } })
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
          err.message || "Some error occurred while approving the patient."
      });
    });
};

