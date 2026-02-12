require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const taskRoutes = require('./src/routes/task.routes');
const { errorHandler } = require('./src/middlewares/errorHandler');
const { authLimiter, apiLimiter } = require('./src/middlewares/rateLimiter');
const { logActivity } = require('./src/middlewares/activityLogger');
const swaggerDocs = require('./src/config/swagger');

const app = express();
app.set('trust proxy', 1);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Task Management System.' });
});

swaggerDocs(app);

// Apply activity logger to all /api routes
app.use('/api', logActivity);

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/tasks', apiLimiter, taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced.');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
