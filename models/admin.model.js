module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("admin", {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  return Admin;
};