const { Sequelize } = require('sequelize');
const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/user.model')(sequelize, Sequelize);
db.Task = require('../models/task.model')(sequelize, Sequelize);
db.ActivityLog = require('../models/activityLog.model')(sequelize, Sequelize);

db.User.hasMany(db.Task, { as: 'tasks' });
db.Task.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'user',
});

db.User.hasMany(db.ActivityLog, { as: 'activityLogs' });
db.ActivityLog.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = db;
