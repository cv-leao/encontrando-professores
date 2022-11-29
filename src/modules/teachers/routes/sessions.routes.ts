import { Router } from "express";
import SessionsTeachersController from "../controllers/SessionsTeachersController";

const sessionsTeachersRouter = Router();
const sessionsTeachersController = new SessionsTeachersController();

sessionsTeachersRouter.post("", sessionsTeachersController.create);

export default sessionsTeachersRouter;
