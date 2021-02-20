module.exports = (sequelize, Sequelize) => {
  const Training = sequelize.define("training", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    videoURL: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    questions: {
      type: Sequelize.STRING,
      get: function () {
        return JSON.parse(this.getDataValue('questions'));
      },
      set: function (val) {
        return this.setDataValue('questions', JSON.stringify(val));
      }
    },
  });

  return Training;
};