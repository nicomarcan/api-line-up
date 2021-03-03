module.exports = (sequelize, Sequelize) => {
  const Reward = sequelize.define("reward", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageURL: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Reward;
};