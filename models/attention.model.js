module.exports = (sequelize, Sequelize) => {
  const Attention = sequelize.define("attention", {
    patientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'patients',
        key: 'id'
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    date: {
      type: Sequelize.DATE,
    }
  });

  return Attention;
};