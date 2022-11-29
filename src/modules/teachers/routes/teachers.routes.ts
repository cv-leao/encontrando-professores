import { Router } from "express";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import TeachersController from "../controllers/TeachersController";

const teachersRouter = Router();
const teachersController = new TeachersController();

teachersRouter.post("/create", teachersController.create);
teachersRouter.put("/update", isAuthenticated, teachersController.update);
teachersRouter.get("/show", isAuthenticated, teachersController.show);
teachersRouter.get(
  "/list/students",
  isAuthenticated,
  teachersController.listStudents
);

export default teachersRouter;
