import express from 'express';
import authRoute from './auth.routes';
import userRoute from './user.routes';
import healthRoute from './health.routes';
import categoryRoute from './category.route';
import checklistRoute from './checklist.route';
import taskRoute from './task.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
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
    path: '/users',
    route: userRoute,
  },
  {
    path: '/health',
    route: healthRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
