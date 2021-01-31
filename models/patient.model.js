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
    dni: {
      type: Sequelize.STRING,
      unique: true,
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
    birthDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  });

  return Patient;
};