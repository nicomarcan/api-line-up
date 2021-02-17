const db = require("../models");
const Admin = db.admins;
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create and Save a new Admin
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

  // Create a Admin
  const admin = {
    email: req.body.email,
    password: password,
  };

  // Save Admin in the database
  Admin.create(admin)
    .then(data => {
      const payload = {
        admin: {
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
          err.message || "Some error occurred while creating the Admin."
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
    let admin = await Admin.findOne({
      where: {
        email: email
      }
    });
    if (!admin)
      return res.status(400).json({
        message: "Admin Not Exist"
      });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !"
      });
    const payload = {
      user: {
        id: admin.id
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
          token
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
