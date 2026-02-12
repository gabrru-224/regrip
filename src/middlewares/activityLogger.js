const db = require('../config/db');
const ActivityLog = db.ActivityLog;

const logActivity = async (req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    const logData = {
      userId: req.user ? req.user.id : null,
      action: `${req.method} ${req.originalUrl}`,
      ipAddress: req.ip,
      details: `Status: ${res.statusCode}`,
    };
    ActivityLog.create(logData);
    originalSend.apply(res, arguments);
  };
  next();
};

module.exports = {
  logActivity,
};
