import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface ISessionToCreated {
  email: string;
  password: string;
}

interface ISessionToReturn {
  student: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

class CreateSessionsService {
  public async execute({
    email,
    password,
  }: ISessionToCreated): Promise<ISessionToReturn> {
    const studentExists = await prismaClient.students.findUnique({
      where: {
        email,
      },
    });

    if (!studentExists) {
      throw new AppError("Combinação incorreta de e-mail/senha.", 401);
    }

    const passwordConfirmed = await compare(password, studentExists.password);

    if (!passwordConfirmed) {
      throw new AppError("Combinação incorreta de e-mail/senha.", 401);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = sign(
      { sub: studentExists.id },
      process.env.JWT_SECRET as string,
      {
        // subject: user.id,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expiresIn: process.env.TOKEN_EXPIREIN,
      }
    );

    const student = await prismaClient.students.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: {
        email: email,
      },
    });

    return { student, token } as ISessionToReturn;
  }
}

export default CreateSessionsService;
