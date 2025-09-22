import { Express } from 'express';
import taskRoutes from './task.route';

const routes = (app: Express) => {
  app.use("/api/tasks", taskRoutes)
}

export default routes;