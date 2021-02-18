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
    date: {
      type: Sequelize.DATE,
    }
  });

  return Attention;
};