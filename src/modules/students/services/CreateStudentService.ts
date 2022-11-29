import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";
import { hash } from "bcryptjs";
import { Students } from "@prisma/client";

interface IStudentToCreate {
  name: string;
  email: string;
  password: string;
  samePasswords: string;
}

type IStudentCreated = Omit<Students, "password">;

class CreateStudentService {
  public async execute({
    name,
    email,
    password,
    samePasswords,
  }: IStudentToCreate): Promise<IStudentCreated> {
    /*********Conferindo se o email inserido pelo usuário está "padronizado"*********/
    const standardizedEmail = /\S+@\S+\.\S+/;

    if (!standardizedEmail.test(email)) {
      throw new AppError("Endereço de e-mail inválido.");
    }
    /********************************************************************************/

    if (name === "") {
      throw new AppError("Nome inválido.");
    }

    const emailExists = await prismaClient.students.findUnique({
      where: {
        email: email,
      },
    });

    const emailToIf = !!emailExists;

    if (emailToIf) {
      throw new AppError("Email já utilizado.");
    }

    /*********Conferindo a confirmação de senha do usuário na hora do cadastro*********/
    if (!(password.length >= 6)) {
      throw new AppError("A senha deve conter no mínimo 6 caracteres.");
    }

    if (!(password === samePasswords)) {
      throw new AppError("As senhas devem ser iguais.");
    }
    /**********************************************************************************/

    const hashedPassword = await hash(password, 8);

    const student = await prismaClient.students.create({
      select: {
        id: true,
        name: true,
        email: true,
      },
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return student;
  }
}

export default CreateStudentService;
