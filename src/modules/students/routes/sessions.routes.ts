import { Router } from "express";
import SessionsStudentsController from "../controllers/SessionsStudentsController";

const sessionsStudentsRouter = Router();
const sessionsStudentsController = new SessionsStudentsController();

sessionsStudentsRouter.post("", sessionsStudentsController.create);

export default sessionsStudentsRouter;
