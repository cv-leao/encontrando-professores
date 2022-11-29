import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../../../shared/errors/AppError";
import CreateStudentService from "../services/CreateStudentService";

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
}
