module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },  
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    birthday: {
      type: Sequelize.STRING,
    },
    instagram: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    addressFloor: {
      type: Sequelize.STRING,
    },
    addressNumber: {
      type: Sequelize.STRING,
    },
    doctorOfficePhone: {
      type: Sequelize.STRING,
    },
    alternativeDoctorOfficePhone: {
      type: Sequelize.STRING,
    },
    userLineUpId: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  });

  return User;
};