module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("patient", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isApproved: {
      type: Sequelize.BOOLEAN,
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
    treatmentStart: {
      type: Sequelize.DATEONLY,
    },
    treatmentEnd: {
      type: Sequelize.DATEONLY,
    },
    billingStatus: {
      type: Sequelize.STRING,
    },
  });

  return Patient;
};