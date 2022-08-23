const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const cardColorRoute = require('./cardColor.route');
const notificationRoute = require('./notification.route');
const taskRoute = require('./task.route');
const checklistRoute = require('./checklist.route');
const schedulerRoute = require('./scheduler.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/tasks',
    route: taskRoute,
  },
  {
    path: '/checklists',
    route: checklistRoute,
  },
  {
    path: '/card-colors',
    route: cardColorRoute,
  },
  {
    path: '/notifications',
    route: notificationRoute,
  },
  {
    path: '/schedulers',
    route: schedulerRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
