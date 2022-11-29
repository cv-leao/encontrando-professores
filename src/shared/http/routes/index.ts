import { Router } from "express";
import sessionsTeachersRouter from "../../../modules/teachers/routes/sessions.routes";
import teachersRouter from "../../../modules/teachers/routes/teachers.routes";

const routes = Router();

routes.use("/teachers", teachersRouter);
routes.use("/teachers/session", sessionsTeachersRouter);

export default routes;
