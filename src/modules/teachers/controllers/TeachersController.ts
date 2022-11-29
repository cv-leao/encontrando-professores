import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../../../shared/errors/AppError";
import CreateTeacherService from "../services/CreateTeacherService";
import UpdateTeacherService from "../services/UpdateTeacherService";

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

  public async update(request: Request, response: Response): Promise<Response> {
    const tokenInCookie = request.headers.cookie;

    const id = idInToken(tokenInCookie as string);

    const { name } = await request.body;

    const updateTeacher = new UpdateTeacherService();

    const teacher = await updateTeacher.execute({ id, name }).catch((error) => {
      response.statusCode = 400;
      return error;
    });

    return response.json(teacher);
  }
}
