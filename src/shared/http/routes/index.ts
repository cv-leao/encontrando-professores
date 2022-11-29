import { Router } from "express";
import sessionsStudentsRouter from "../../../modules/students/routes/sessions.routes";
import studentsRouter from "../../../modules/students/routes/students.routes";
import sessionsTeachersRouter from "../../../modules/teachers/routes/sessions.routes";
import teachersRouter from "../../../modules/teachers/routes/teachers.routes";

const routes = Router();

routes.use("/teachers", teachersRouter);
routes.use("/teachers/session", sessionsTeachersRouter);

routes.use("/students", studentsRouter);
routes.use("/students/session", sessionsStudentsRouter);

export default routes;
