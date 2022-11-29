import { Request, Response } from "express";
import CreateTeacherService from "../services/CreateTeacherService";

export default class TeachersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, samePasswords, matter } = request.body;

    const createTeacher = new CreateTeacherService();

    const teacher = await createTeacher
      .execute({
        name,
        email,
        password,
        samePasswords,
        matter,
      })
      .catch((error) => {
        response.statusCode = 400;
        return error;
      });

    return response.json(teacher);
  }
}
