import express from 'express';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';
import categoryRoute from './category.route.js';
import taskRoute from './task.route.js';
import checklistRoute from './checklist.route.js';

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
