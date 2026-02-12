module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('pending', 'in-progress', 'completed'),
      defaultValue: 'pending'
    }
  });

  return Task;
};
