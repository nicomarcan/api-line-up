const db = require("../models");
const Admin = db.admins;
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    if (!user)
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
