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
    isArchived: {
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
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    treatmentStart: {
      type: Sequelize.DATEONLY,
    },
    treatmentEnd: {
      type: Sequelize.DATEONLY,
    },
    cost: {
      type: Sequelize.INTEGER,
    },
    startedTreatment: {
      type: Sequelize.BOOLEAN,
    },
    billingStatus: {
      type: Sequelize.STRING,
    },
    lineUpId: {
      type: Sequelize.STRING,
      unique: true,
    },
    extraInfo: {
      type: Sequelize.JSONB,
      get: function () {
        return JSON.parse(this.getDataValue('extraInfo'));
      },
      set: function (val) {
        return this.setDataValue('extraInfo', JSON.stringify(val));
      }
    },
  });

  return Patient;
};