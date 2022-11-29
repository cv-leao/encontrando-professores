import { Router } from "express";
import teachersRouter from "../../../modules/teachers/routes/teachers.routes";

const routes = Router();

routes.use("/teachers", teachersRouter);

export default routes;
