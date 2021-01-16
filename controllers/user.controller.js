const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({
          errors: errors.array()
      });
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  // Create a User
  const user = {
    username: req.body.username,
    password: password,
  };

  // Save User in the database
  User.create(user)
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
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};
