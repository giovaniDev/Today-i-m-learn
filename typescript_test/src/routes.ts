import { Router } from "express";

import UserController from './controller/UserController';

const routes = Router();

routes.get('/', UserController.index);
routes.get('/email', UserController.create);

export default routes;