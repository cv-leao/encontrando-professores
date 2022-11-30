import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../../../shared/errors/AppError";
import BecomeAStudentOfATeacherService from "../services/BecomeAStudentOfATeacherService";
import CreateStudentService from "../services/CreateStudentService";
import UpdateStudentService from "../services/UpdateStudentService";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const idInToken = (tokenInCookie: string) => {
  if (!tokenInCookie) {
    throw new AppError("O token está ausente.");
  }

  const token = tokenInCookie?.slice(6);

  const decodedToken = verify(token, process.env.JWT_SECRET!);

  const { sub } = decodedToken as ITokenPayload;

  return sub;
};

export default class StudentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, samePasswords } = request.body;

    const createStudent = new CreateStudentService();

    const student = await createStudent
      .execute({
        name,
        email,
        password,
        samePasswords,
      })
      .catch((error) => {
        response.statusCode = 400;
        return error;
      });

    return response.json(student);
  }

  public async becomeAStudentOfATeacher(
    request: Request,
    response: Response
  ): Promise<Response> {
    const tokenInCookie = request.headers.cookie;

    const id_student = idInToken(tokenInCookie as string);

    const { id_teacher } = request.body;

    const becomeAStudentOfATeacher = new BecomeAStudentOfATeacherService();

    const studentsOfATeacher = await becomeAStudentOfATeacher
      .execute({ id_student, id_teacher })
      .catch((error) => {
        response.statusCode = 400;
        return error;
      });

    return response.json(studentsOfATeacher);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const tokenInCookie = request.headers.cookie;

    const id = idInToken(tokenInCookie as string);

    const { name } = await request.body;

    const updateStudent = new UpdateStudentService();

    const student = await updateStudent.execute({ id, name }).catch((error) => {
      response.statusCode = 400;
      return error;
    });

    return response.json(student);
  }
}
