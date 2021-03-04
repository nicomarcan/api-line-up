module.exports = (sequelize, Sequelize) => {
  const RewardPurchase = sequelize.define("reward_purchase", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isDelivered: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    rewardId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'rewards',
        key: 'id'
      }
    },
  });

  return RewardPurchase;
};