import { Router } from "express";
import StudentsController from "../controllers/StudentsController";

const studentsRouter = Router();
const studentsController = new StudentsController();

studentsRouter.post("/create", studentsController.create);

export default studentsRouter;
