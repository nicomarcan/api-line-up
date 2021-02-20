const db = require("../models");
const Patient = db.patients;
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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
    isApproved: false,
    isArchived: false,
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
  Patient.findAll({where: {userId: req.user.id}, order: [['lastname', 'ASC']]})
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

exports.editFields = async (req, res) => {
  Patient.update(req.body.editFields, { where: { id: req.body.id } })
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
          err.message || "Some error occurred while editing patient fields."
      });
    });
};

// Create and Save a new patient
exports.createSession = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  Patient.update({password: password}, { where: { lineUpId: req.body.lineUpId } })
    .then(data => {
      const payload = {
        user: {
          id: data.id
        }
      };
      jwt.sign(
        payload,
        "randomString", {
        expiresIn: 10000
      },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the patient session."
      });
    });
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const { email, password } = req.body;
  try {
    let patient = await Patient.findOne({
      where: {
        email: email
      }
    });
    if (!patient)
      return res.status(400).json({
        message: "Patient Not Exist"
      });
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !"
      });
    const payload = {
      user: {
        id: patient.id
      }
    };
    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token: token,
          patient: patient,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

