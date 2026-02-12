module.exports = (sequelize, Sequelize) => {
  const ActivityLog = sequelize.define("activityLog", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    action: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ipAddress: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    details: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  });

  return ActivityLog;
};
