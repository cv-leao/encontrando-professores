import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface ISessionToCreated {
  email: string;
  password: string;
}

interface ISessionToReturn {
  teacher: {
    id: string;
    name: string;
    email: string;
    matter: string;
  };
  token: string;
}

class CreateSessionsService {
  public async execute({
    email,
    password,
  }: ISessionToCreated): Promise<ISessionToReturn> {
    const teacherExists = await prismaClient.teachers.findUnique({
      where: {
        email,
      },
    });

    if (!teacherExists) {
      throw new AppError("Combinação incorreta de e-mail/senha.", 401);
    }

    const passwordConfirmed = await compare(password, teacherExists.password);

    if (!passwordConfirmed) {
      throw new AppError("Combinação incorreta de e-mail/senha.", 401);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = sign(
      { sub: teacherExists.id },
      process.env.JWT_SECRET as string,
      {
        // subject: user.id,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expiresIn: process.env.TOKEN_EXPIREIN,
      }
    );

    const teacher = await prismaClient.teachers.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        matter: true,
      },
      where: {
        email: email,
      },
    });

    return { teacher, token } as ISessionToReturn;
  }
}

export default CreateSessionsService;
