import { Router } from "express";
import TeachersController from "../controllers/TeachersController";

const teachersRouter = Router();
const teachersController = new TeachersController();

teachersRouter.post("/create", teachersController.create);
teachersRouter.put("/update", teachersController.update);

export default teachersRouter;
