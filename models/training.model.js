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
      type: Sequelize.JSONB,
      get: function () {
        return JSON.parse(this.getDataValue('questions'));
      },
      set: function (val) {
        return this.setDataValue('questions', JSON.stringify(val));
      }
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Training;
};