module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    otp: {
      type: Sequelize.STRING,
      allowNull: true
    },
    otpExpires: {
      type: Sequelize.DATE,
      allowNull: true
    }
  });

  return User;
};